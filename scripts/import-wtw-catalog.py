"""Import the owner-approved WTW grouping without reclassifying PDF pages."""

import json
import sys
from pathlib import Path

from PIL import Image


APPROVED_HASH = "4c116b53e4623cb71cb54d5630e30e8741a1df7e39d81e7d1ccc5a3a009229ec"
ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: import-wtw-catalog.py <wtw-catalog-approved.json>")
    source_file = Path(sys.argv[1]).resolve()
    approved = json.loads(source_file.read_text(encoding="utf-8"))
    if (approved["source"]["sha256"] != APPROVED_HASH or
            approved["source"]["pageCount"] != 179 or
            len(approved["models"]) != 65 or
            sum(len(model["colourways"]) for model in approved["models"]) != 173):
        raise ValueError("Approved WTW catalog baseline mismatch")
    retired = {row["code"]: row["mergedInto"] for row in approved["reservedCodes"]}
    if retired != {"WTW-005": "WTW-006", "WTW-007": "WTW-004"}:
        raise ValueError("Reserved code registry mismatch")

    assets_dir = ROOT / "public" / "catalog" / "wall-to-wall"
    output = []
    asset_count = 0
    for model in approved["models"]:
        code = model["code"]
        if code in retired or model["status"] != "active":
            raise ValueError(f"Non-active WTW product: {code}")
        variants = []
        for colourway in model["colourways"]:
            source_image = source_file.parent / colourway["image"]
            if not source_image.is_file():
                raise FileNotFoundError(source_image)
            asset_name = f"{colourway['code'].lower()}.webp"
            asset = assets_dir / code.lower() / asset_name
            asset.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(source_image) as image:
                source_size = image.size
                if not asset.exists():
                    image.convert("RGB").save(asset, "WEBP", quality=93, method=6)
            with Image.open(asset) as image:
                if image.size != source_size:
                    raise ValueError(f"Unexpected WTW asset size: {asset}")
            variants.append({
                "code": colourway["code"],
                "image": f"/catalog/wall-to-wall/{code.lower()}/{asset_name}",
                "colourFamily": colourway["dominantColourFamily"],
            })
            asset_count += 1
        representative = next((v for v, source in zip(variants, model["colourways"])
                               if model["representativePage"] in source["sourcePages"]), None)
        if representative is None:
            raise ValueError(f"Representative image has no approved colourway: {code}")
        technical = {key: None for key in (
            "material", "yarnType", "pileHeight", "totalHeight", "pileWeight", "totalWeight",
            "density", "backing", "rollWidth", "construction", "fireRating",
            "commercialClass", "productionMethod", "countryOfOrigin", "technicalPdf", "certificateIds",
        )}
        output.append({
            "code": code,
            "slug": code.lower(),
            "category": model["category"],
            "styles": model["tags"],
            "confidence": model["confidence"],
            "representativeImage": representative["image"],
            "colourways": variants,
            "technicalSpecs": technical,
            "minimumOrderQuantityM2": None,
        })

    if len({variant["code"] for model in output for variant in model["colourways"]}) != 173:
        raise ValueError("Preview codes are not unique")
    if next(model for model in output if model["code"] == "WTW-065")["category"] != "Geometric":
        raise ValueError("WTW-065 category mismatch")
    internal = {
        "sourceFilename": approved["source"]["filename"],
        "sourceSha256": APPROVED_HASH,
        "sourcePageCount": 179,
        "reservedCodes": approved["reservedCodes"],
        "pages": approved["pageCrossReference"],
    }
    (ROOT / "lib" / "wtw-catalog-data.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    internal_path = ROOT / "internal" / "wtw-cross-reference.json"
    internal_path.parent.mkdir(parents=True, exist_ok=True)
    internal_path.write_text(json.dumps(internal, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"activeModels": len(output), "uniquePreviews": asset_count, "traceablePages": len(internal["pages"])}))


if __name__ == "__main__":
    main()
