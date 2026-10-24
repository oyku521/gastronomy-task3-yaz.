const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../data.js'), 'utf8')+'\nglobalThis.catalog=foodCatalog;globalThis.list=recipes;', context);
const {catalog,list}=context;
assert.equal(list.length,80);
assert.equal(new Set(list.map(r=>r.id)).size,80);
const animal = new Set(['egg','milk','yogurt','feta','chicken','beef','salmon','fish','tuna','butter','honey']);
for (const r of list) {
 assert(r.name.en && r.name.tr && r.minutes>0 && r.servings===2);
 assert(r.ingredients.length>0);
 assert(r.photo && r.photo.sheet>=1 && r.photo.sheet<=5);
 assert(Number.isInteger(r.photo.column) && r.photo.column>=0 && r.photo.column<4);
 assert(r.photo.crop.length===4 && r.photo.crop.every(Number.isFinite));
 assert(r.photo.crop[0]>=0 && r.photo.crop[1]>=0 && r.photo.crop[2]>0 && r.photo.crop[3]>0);
 assert(r.photo.crop[0]+r.photo.crop[2]<=1536 && r.photo.crop[1]+r.photo.crop[3]<=1024);
 assert(Number.isInteger(r.photo.row) && r.photo.row>=0 && r.photo.row<4);
 assert(fs.existsSync(path.join(__dirname,`../images/food/collection-${r.photo.sheet}.webp`)));
 for(const i of r.ingredients){assert(catalog[i.id]);assert(i.grams>0);assert(catalog[i.id].en && catalog[i.id].tr);for(const macro of ['protein','carbs','fat'])assert(Number.isFinite(catalog[i.id][macro])&&catalog[i.id][macro]>=0);}
 if(r.vegan)assert(!r.ingredients.some(i=>animal.has(i.id)),r.id+' vegan claim');
 if(r.glutenFree)assert(!r.ingredients.some(i=>catalog[i.id].allergens.includes('gluten')),r.id+' gluten claim');
}
assert.equal(new Set(list.map(r=>`${r.photo.sheet}/${r.photo.row}/${r.photo.column}`)).size,80);
assert(list.some(r=>r.vegan&&r.glutenFree));
assert(list.some(r=>!r.glutenFree));
assert(list.some(r=>!r.vegan));
console.log(`PASS: 80 bilingual measured recipes, unique IDs, nutrition inputs, dietary claims and local illustrations.`);
