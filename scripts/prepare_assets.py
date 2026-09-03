from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageChops, ImageOps


SOURCE = Path(os.environ.get("BIN_MANSOOR_SOURCE_DIR", "catalogue-source"))
EXTRACTED = Path(os.environ.get("BIN_MANSOOR_EXTRACTED_DIR", "assets-source"))
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "media"


PRODUCTS: dict[str, dict[str, str]] = {
    "rhythm-12": {
        "grey": "12.jpg",
        "ivory": "12B.png",
        "graphite": "12C.png",
    },
    "terra-13": {
        "sage": "13.jpg",
        "natural": "13B.png",
        "stone": "13C_57x75.png",
    },
    "flow-14": {
        "petrol": "14.jpg",
        "ivory": "14B.png",
        "charcoal": "14C.png",
    },
    "coast-1007a": {
        "sand": "1007A_RM133.png",
        "ocean": "1007A_RM122.png",
    },
    "contour-1007d": {
        "light-beige": "1007D_CX644_L BEIGE.png",
        "grey": "1007D_CX666_GREY.png",
        "vizon": "1007D_CX677_VIZON.png",
        "blue": "1007D_RM122_BLUE.png",
    },
    "frame-0105a": {
        "black": "0105A_BLACK.png",
        "cream": "0105A_CREAM.png",
        "grey": "0105A_GREY.png",
        "light-beige": "0105A_L BEIGE.png",
        "vizon": "0105A_VIZON.png",
    },
    "palace-415": {"cream": "415_90_9001_200x290_crem.bmp"},
    "heritage-0534a": {"classic": "0534A.bmp"},
    "medallion-648": {"beige": "648_beige.bmp"},
    "burgundy-palace-672": {"red": "672_red.png"},
    "ivory-700": {"ivory": "700_k.bmp"},
    "vine-844": {"cherry": "844_CHERRY.bmp"},
    "royal-1003": {"beige": "1003_16_bej.bmp"},
}


def save_webp(source: Path, destination: Path, max_size: tuple[int, int] = (1600, 1900)) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=84, method=6)


def prepare_logo() -> None:
    source = EXTRACTED / "brand" / "BIN MANSSOR.jpeg"
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        right = image.crop((image.width // 2, 0, image.width, image.height))
        difference = ImageChops.difference(right, Image.new("RGB", right.size, "white")).convert("L")
        difference = difference.point(lambda value: 255 if value > 18 else 0)
        box = difference.getbbox()
        if box:
            left, top, right_edge, bottom = box
            padding = 32
            box = (
                max(0, left - padding),
                max(0, top - padding),
                min(right.width, right_edge + padding),
                min(right.height, bottom + padding),
            )
            right = right.crop(box)
        destination = OUTPUT / "brand" / "bin-mansoor-logo.webp"
        destination.parent.mkdir(parents=True, exist_ok=True)
        right.save(destination, "WEBP", quality=92, method=6)


def main() -> None:
    missing: list[str] = []
    for slug, variants in PRODUCTS.items():
        for variant, filename in variants.items():
            source = SOURCE / filename
            if not source.exists():
                missing.append(filename)
                continue
            save_webp(source, OUTPUT / "products" / slug / f"{variant}.webp")
    prepare_logo()
    if missing:
        raise FileNotFoundError("Missing source assets: " + ", ".join(missing))
    print(f"Prepared {sum(len(variants) for variants in PRODUCTS.values())} product images and one logo.")


if __name__ == "__main__":
    main()
