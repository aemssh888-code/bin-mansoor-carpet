"""Generate web derivatives; source images and analysis stay read-only."""
from pathlib import Path
import argparse, json, hashlib, csv
from PIL import Image, ImageOps
parser=argparse.ArgumentParser()
parser.add_argument('analysis',type=Path)
parser.add_argument('owner_output',type=Path)
args=parser.parse_args()
site=Path(__file__).resolve().parents[1]
business_constants=json.loads((site/'lib'/'business-constants.json').read_text(encoding='utf-8'))
minimum_order_m2_per_item=business_constants['minimumOrderM2PerItem']
data=json.loads(args.analysis.read_text(encoding='utf-8'))
root=Path(data['sourceRoot']).resolve()
files={f['id']:f for f in data['files']}
approved=[m for m in data['models'] if m['classificationStatus']=='WEBSITE_APPROVED']
assert len(approved)==43 and sum(len(m['colorways']) for m in approved)==81
category={'MOD':'modern','MCL':'modern-classic','CLS':'classic-heritage'}
specs=['material','construction','pileHeight','pileWeight','totalWeight','density','backing','availableSizes','sizes','width','customColors','customDesign','application','leadTime']
def joined(values, locale):
    conjunction={'ar':' و','tr':' ve ','en':' and '}[locale]
    return values[0] if len(values)==1 else f"{', '.join(values[:-1])}{conjunction}{values[-1]}"
def description(m, collection):
    ar=joined([s['ar'] for s in m['styles']],'ar')
    en=joined([s['en'].lower() for s in m['styles']],'en').capitalize()
    tr=joined([s['tr'].lower() for s in m['styles']],'tr').capitalize()
    return {'ar':f"تصميم {m['name']['ar']} من مجموعة {collection['ar']} بطابع {ar}. تواصل معنا لتأكيد الألوان وتفاصيل الطلب.",'en':f"{m['name']['en']}, a {en.lower()} design from the {collection['en']} collection. Contact us to confirm colour and order details.",'tr':f"{m['name']['tr']}, {collection['tr']} koleksiyonundan {tr.lower()} karakterli bir tasarım. Renk ve sipariş detaylarını teyit etmek için bizimle iletişime geçin."}
master=[]; public=[]; rows=[]
for m in approved:
    code=m['binMansoorCode']; key=category[m['categoryKey']]
    colors=[]; refs=[]
    for c in m['colorways']:
        f=files[c['sourceFileId']]; src=Path(c['image']).resolve()
        assert src.is_relative_to(root) and f['publicEligible'] and not f['technicalSource']
        assert hashlib.sha256(src.read_bytes()).hexdigest()==f['sha256']
        stem=c['code'].lower(); target=site/'public'/'catalog'/key
        target.mkdir(parents=True,exist_ok=True)
        image=ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        variants=[]
        for width in sorted({min(image.width,w) for w in [320,640,1000]}):
            copy=image.resize((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
            name=f'{stem}-{width}.webp'; copy.save(target/name,'WEBP',quality=91,method=6)
            variants.append({'src':f'/catalog/{key}/{name}','width':copy.width,'height':copy.height})
        asset=variants[-1]
        color={'code':c['code'],'originalCode':src.stem,'name':c['name'],'image':asset['src'],'imageKind':'design-preview','width':asset['width'],'height':asset['height'],'sources':variants,'productionConfirmed':False}
        colors.append(color)
        refs.append({'colorwayCode':c['code'],'originalFilename':src.name,'originalPath':str(src),'sha256':f['sha256'],'websiteImage':asset['src']})
        rows.append({'BIN Mansoor Code':code,'Original Source Code':m['originalCode'],'Arabic Name':m['name']['ar'],'Turkish Name':m['name']['tr'],'English Name':m['name']['en'],'Category':m['category']['en'],'Collection':m['collection']['en'],'Style':'; '.join(s['en'] for s in m['styles']),'Colorway Code':c['code'],'Colorway Name':c['name']['en'],'Arabic Colorway':c['name']['ar'],'Turkish Colorway':c['name']['tr'],'Original Filename':src.name,'Original Folder':str(src.parent),'Website Image':asset['src'],'Publication Status':'Approved for integration; deployment pending','Notes':m['notes']})
    hero=next(colors[i] for i,c in enumerate(m['colorways']) if c['image']==m['heroImage'])
    collection={**m['collection'],'ar':'تكوينات أرضية'} if m['collection']['en']=='Landforms' else m['collection']
    p={'id':code,'binMansoorCode':code,'originalCode':m['originalCode'],'slug':code.lower(),'name':m['name'],'categoryKey':key,'category':m['category'],'collection':collection,'style':m['style'],'styles':m['styles'],'heroImage':hero['image'],'heroColorwayCode':hero['code'],'galleryImages':[c['image'] for c in colors if c!=hero],'colorways':colors,'featured':code in data['homepageTop10'],'sortOrder':data['homepageTop10'].index(code) if code in data['homepageTop10'] else 100+len(public),'technicalSpecs':dict.fromkeys(specs),'documents':{'catalogPdf':None,'technicalSheetPdf':None},'availability':{'minimumOrderQuantity':minimum_order_m2_per_item,'minimumOrderScope':'per-item'},'classificationStatus':'approved','imageKind':'design-preview','description':description(m,collection)}
    public.append(p)
    master.append({**p,'sourceReference':next(r for r in refs if r['colorwayCode']==hero['code']),'sourceReferences':refs,'allOriginalReferences':[{'originalFilename':files[i]['filename'],'originalPath':files[i]['path']} for i in m['sourceFileIds']]})
public.sort(key=lambda p:p['sortOrder'])
(site/'lib'/'catalog-data.json').write_text(json.dumps(public,ensure_ascii=False,indent=2),encoding='utf-8')
args.owner_output.mkdir(parents=True,exist_ok=True)
(args.owner_output/'catalog-master.internal.json').write_text(json.dumps(master,ensure_ascii=False,indent=2),encoding='utf-8')
(args.owner_output/'owner-rows.json').write_text(json.dumps(rows,ensure_ascii=False),encoding='utf-8')
with (args.owner_output/'BIN_MANSOOR_CATALOG_MASTER.csv').open('w',encoding='utf-8-sig',newline='') as out:
    writer=csv.DictWriter(out,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
print(json.dumps({'models':len(public),'colorways':len(rows),'webBytes':sum(p.stat().st_size for p in (site/'public/catalog').rglob('*.webp'))}))
