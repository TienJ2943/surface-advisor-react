export function toggleArrayItem(items, value) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

export function filterProducts(products, filters) {
  return products.filter((product) => {
    if (filters.uses.length && !filters.uses.some((use) => product.uses.includes(use.toLowerCase()))) return false;
    if (filters.brands.length && !filters.brands.includes(product.brand)) return false;
    if (filters.cats.length && !filters.cats.includes(product.cat)) return false;
    if (filters.ram.length && !filters.ram.some((ram) => product.ram === ram || product.specs.join(" ").includes(ram))) return false;
    if (product.price > filters.maxPrice) return false;
    return true;
  });
}

export function filterBundles(bundles, selectedUses) {
  if (!selectedUses.length) return bundles;
  return bundles.filter((bundle) => selectedUses.some((use) => bundle.bestFor.includes(use.toLowerCase())));
}
