# Smart Kitchen / Akıllı Mutfak

A bilingual, responsive recipe website published with GitHub Pages. English is the default; English/Türkçe is available throughout the interface, ingredient names, cooking steps and installation guidance.

## Features

- **50 measured recipes:** classic everyday meals alongside vegan and gluten-free ingredient options. All recipes appear initially; dietary filters are optional and combinable.
- 29 vegan recipes and 47 recipes without listed gluten-containing ingredients.
- Search names and ingredients, filter by category or pantry ingredients, sort by protein/calories/time, and save favorites locally.
- Recipe details with gram quantities, adjustable servings, cooking steps, ingredient allergen notes and celiac preparation guidance.
- Estimated energy (kcal), protein, carbohydrates and fat **per serving**, plus each macro's share of estimated calories. Changing servings scales ingredient amounts, not nutrition per serving.
- Original SVG leaf logo and culinary illustrations. These are decorative illustrations, not photographs of the prepared dishes.
- Installable PWA with all recipe data, both languages and artwork available offline after the readiness message. Language, favorites and ingredient selections are stored on the device.

## Nutrition methodology and limits

`data.js` contains bilingual ingredients and recipes. Each ingredient has **generic editorial estimates** of protein, carbohydrate and fat per 100 g. These are not values fetched from a verified nutrient database, laboratory or branded-product label and must not be presented as such.

For each recipe, macro grams are summed from `ingredient grams × macro per 100 g / 100`, then divided by the base number of servings. Calories use `4 × protein + 4 × carbohydrate + 9 × fat`. Macro percentages are calorie shares; rounding preserves a 100% total. These are not gram-weight percentages. Fiber-specific energy adjustments are not modeled.

All recipes currently have a base yield of 2 servings. Quantities are indicative, not a diet prescription. Water and optional seasonings are not included in the estimates. Ingredient names specify cooked legumes/grains versus raw meat/vegetables. Use cooked weights for cooked ingredients. Preparation losses, actual yield and different products change nutrition. Replace editorial estimates with validated ingredient-level data before using the site for clinical nutrition decisions.

## Dietary labels

Vegan flags exclude eggs, dairy, meat, fish and honey. Gluten-free ingredient flags exclude the catalog's wheat/gluten ingredients. Recipes with standard wheat pasta or wheat flour remain outside that filter.

A gluten-free ingredient label is **not celiac safety certification**. Packaged foods (including oats, rice/corn flours, pasta, tofu and seasonings) need label checking and certified gluten-free sourcing where appropriate. Prevent cross-contact using clean, separate equipment, surfaces, strainers and cooking water; shared fryers can introduce gluten. Allergen lists are ingredient notes, not exhaustive allergen-free claims. Personal medical needs require a clinician or dietitian.

## Run locally

In this checkout:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser. No package installation, API key or backend is needed. The existing checkout is sufficient; no extra Git worktree is necessary.

## Validation

```sh
node tests/catalog.test.cjs
node --check app.js
node --check pwa.js
node --check sw.js
```

The catalog check runs in GitHub Actions before publication. Browser validation during development covered all 50 recipes, both languages and persistence, combined dietary filters, pantry matching, favorites, sorting, translated details, serving scaling, macro calculations, empty states, mobile layouts and offline use including images. Re-run browser validation after behavior changes.

## Publish

Repository: https://github.com/oyku521/gastronomy-task3-yaz.

The `Publish website` GitHub Actions workflow deploys `main` to GitHub Pages. In **Settings → Pages**, choose **GitHub Actions** as the source. Only public application files, icons and images are uploaded; tests and development files are excluded from the site artifact.

For application changes, bump `CACHE` in `sw.js` and keep its precache list aligned with the public assets. The worker installs the complete cache before activation. Existing open tabs can need a refresh for a new release. Favorites persist across updates; matching old Turkish favorites are migrated to stable recipe IDs where possible.

## Türkçe özet

İngilizce ve Türkçe seçenekli, 50 tarifli Akıllı Mutfak sitesi. İlk açılışta tüm tarifler gösterilir. Vegan ve glutensiz malzeme filtreleri birlikte kullanılabilir. Klasik tarifler de bulunur. Tarif ayrıntılarında gramaj, porsiyon ayarı, hazırlanış, alerjen notları ve porsiyon başına yaklaşık besin değerleri vardır. Besin verileri doğrulanmış kaynaklardan alınmış ölçümler değil, genel editoryal tahminlerdir. Glutensiz etiketi çölyak için güvenlik garantisi vermez; sertifikalı ürün, etiket kontrolü ve çapraz temas önlemleri gerekir.
