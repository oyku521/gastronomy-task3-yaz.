const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../data.js'), 'utf8')+'\nglobalThis.catalog=foodCatalog;globalThis.list=recipes;', context);
const {catalog,list}=context;
assert.equal(list.length,50);
assert.equal(new Set(list.map(r=>r.id)).size,50);
const animal = new Set(['egg','milk','yogurt','feta','chicken','beef','salmon','fish','tuna','butter','honey']);
for (const r of list) {
 assert(r.name.en && r.name.tr && r.minutes>0 && r.servings===2);
 assert(r.ingredients.length>0);
 assert(fs.existsSync(path.join(__dirname,`../images/${r.category}.svg`)));
 for(const i of r.ingredients){assert(catalog[i.id]);assert(i.grams>0);assert(catalog[i.id].en && catalog[i.id].tr);for(const macro of ['protein','carbs','fat'])assert(Number.isFinite(catalog[i.id][macro])&&catalog[i.id][macro]>=0);}
 if(r.vegan)assert(!r.ingredients.some(i=>animal.has(i.id)),r.id+' vegan claim');
 if(r.glutenFree)assert(!r.ingredients.some(i=>catalog[i.id].allergens.includes('gluten')),r.id+' gluten claim');
}
assert(list.some(r=>r.vegan&&r.glutenFree));
assert(list.some(r=>!r.glutenFree));
assert(list.some(r=>!r.vegan));
console.log(`PASS: 50 bilingual measured recipes, unique IDs, nutrition inputs, dietary claims and local illustrations.`);
