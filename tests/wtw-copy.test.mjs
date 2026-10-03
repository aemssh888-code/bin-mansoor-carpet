import test from 'node:test';
import assert from 'node:assert/strict';
import wtwModels from '../lib/wtw-catalog-data.json' with {type:'json'};
import {wtwColourCount,wtwStyle} from '../lib/wtw-copy.ts';

test('all approved WTW styles have localized Arabic and Turkish display labels',()=>{
 for(const style of new Set(wtwModels.flatMap(model=>model.styles))){
  assert.notEqual(wtwStyle(style,'ar'),style,`Arabic: ${style}`);
  assert.ok(wtwStyle(style,'tr'));
  assert.equal(wtwStyle(style,'en'),style);
 }
});

test('WTW cards describe previews rather than claiming distinct colours',()=>{
 assert.equal(wtwColourCount(1,'ar'),'معاينة لونية واحدة');
 assert.equal(wtwColourCount(2,'ar'),'معاينتان لونيتان');
 assert.equal(wtwColourCount(7,'ar'),'7 معاينات لونية');
 assert.equal(wtwColourCount(1,'en'),'1 colour/design preview');
 assert.equal(wtwColourCount(7,'en'),'7 colour/design previews');
 assert.equal(wtwColourCount(7,'tr'),'7 renk/desen ön izlemesi');
});
