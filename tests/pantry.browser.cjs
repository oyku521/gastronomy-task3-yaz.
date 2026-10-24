// Requires Playwright. Example: CHROMIUM_PATH=/usr/bin/chromium KITCHEN_TEST_URL=http://localhost:8010/gastronomy-task3-yaz./ node tests/pantry.browser.cjs
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 try {
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.KITCHEN_TEST_URL||'http://localhost:8000/');await page.waitForSelector('.recipe-card');
  assert.equal(await page.evaluate(()=>recipes.length),80);
  await page.locator('#glutenFree').check();await page.locator('.ingredient input[value="tomato"]').check();
  const tomato=await page.evaluate(()=>matches());
  assert(tomato.length>5,'A single tomato selection must suggest several GF recipes');
  assert(tomato.every(r=>r.glutenFree&&r.ingredients.some(i=>i.id==='tomato')));
  assert(tomato.some(r=>r.missing.length>1),'Do not reinstate the restrictive one-missing-ingredient rule');
  assert(tomato.some(r=>r.id==='r001'),'Menemen must be suggested for tomato');
  assert(tomato.some(r=>r.id==='r081'),'GF tomato soup must be suggested');
  assert(await page.locator('.match-note').first().innerText().then(s=>s.includes('Missing')));
  const coverage=tomato.map(r=>r.have/r.ingredients.length);assert(coverage.every((x,i)=>i===0||coverage[i-1]>=x));
  await page.locator('#vegan').check();const vegan=await page.evaluate(()=>matches());assert(vegan.length>0);assert(vegan.every(r=>r.vegan&&r.glutenFree));assert(!vegan.some(r=>r.id==='r001'));
  await page.locator('#language').selectOption('tr');assert.equal(await page.locator('.ingredient input:checked').count(),1);assert((await page.locator('#selectionNote').innerText()).includes('en az birini'));assert((await page.locator('.match-note').first().innerText()).includes('Eksik'));
  await page.locator('#resetFilters').click();await page.locator('#glutenFree').check();await page.locator('.ingredient input[value="pasta"]').check();assert.equal(await page.locator('.recipe-card').count(),0);assert(await page.locator('#glutenSelectionNote').isVisible());
  await page.locator('.ingredient input[value="pasta"]').uncheck();await page.locator('.ingredient input[value="gfPasta"]').check();assert(await page.locator('.recipe-card').count()>0);assert(await page.locator('#glutenSelectionNote').isHidden());assert(await page.evaluate(()=>matches().every(r=>r.glutenFree&&r.ingredients.some(i=>i.id==='gfPasta'))));
  await page.locator('#resetFilters').click();for(let i=0;i<9;i++)if(await page.locator('#showMore').isVisible())await page.locator('#showMore').click();assert.equal(await page.locator('.recipe-card').count(),80);
  assert(await page.evaluate(()=>recipes.every(r=>methods[r.method]?.en?.length>=3&&methods[r.method]?.tr?.length>=3)));
  await page.waitForFunction(()=>document.getElementById('offlineStatus').textContent.includes('80 tarif'));
  await page.context().setOffline(true);await page.reload();await page.waitForSelector('.recipe-card');assert.equal(await page.evaluate(()=>recipes.length),80);await page.locator('#glutenFree').check();await page.locator('.ingredient input[value="tomato"]').check();assert(await page.locator('.recipe-card').count()>0);
  assert.deepEqual(errors,[]);console.log('PASS: 80 recipes; single-ingredient GF suggestions, ranking, missing labels, strict combined dietary filters, bilingual selection, wheat/GF distinction, all instructions and offline matching.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
