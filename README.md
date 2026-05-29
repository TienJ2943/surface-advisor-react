# Surface Advisor React/Tailwind Refactor

This refactor converts the original single HTML file into a maintainable React + Tailwind CSS project.

## Structure

```txt
src/
  App.jsx
  main.jsx
  index.css
  data/
    products.js
    bundles.js
    filterOptions.js
  utils/
    filterProducts.js
    format.js
  components/
    Sidebar.jsx
    FilterChip.jsx
    Tabs.jsx
    ProductGrid.jsx
    ProductCard.jsx
    ProductDetail.jsx
    BundleGrid.jsx
    BundleCard.jsx
    ComparePanel.jsx
```

## Run

```bash
npm install
npm run dev
```

## Main idea

- `data/` stores products, Microsoft 365 bundles, and filter options.
- `utils/` stores reusable filtering and formatting logic.
- `components/` stores visual UI pieces.
- `App.jsx` owns the application state and passes data/functions down as props.
