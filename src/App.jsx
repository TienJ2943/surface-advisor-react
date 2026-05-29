import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Tabs from "./components/Tabs";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import BundleGrid from "./components/BundleGrid";
import ComparePanel from "./components/ComparePanel";
import { products } from "./data/products";
import { bundles } from "./data/bundles";
import { filterBundles, filterProducts, toggleArrayItem } from "./utils/filterProducts";

const initialFilters = {
  uses: [],
  brands: [],
  cats: [],
  ram: [],
  maxPrice: 2800,
};

export default function App() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedBundleId, setSelectedBundleId] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [compareA, setCompareA] = useState(null);
  const [compareB, setCompareB] = useState(null);

  const filteredProducts = useMemo(() => filterProducts(products, filters), [filters]);
  const filteredBundles = useMemo(() => filterBundles(bundles, filters.uses), [filters.uses]);

  const selectedProduct = filteredProducts.find((product) => product.id === selectedProductId) || null;
  const selectedBundle = bundles.find((bundle) => bundle.id === selectedBundleId) || null;
  const productA = products.find((product) => product.id === compareA) || null;
  const productB = products.find((product) => product.id === compareB) || null;

  function handleToggleFilter(filterName, value) {
    setFilters((current) => ({ ...current, [filterName]: toggleArrayItem(current[filterName], value) }));
  }

  function handleCompare(id) {
    if (compareA === id) setCompareA(null);
    else if (compareB === id) setCompareB(null);
    else if (!compareA) setCompareA(id);
    else if (!compareB) setCompareB(id);
    else setCompareB(id);
  }

  function resetFilters() {
    setFilters(initialFilters);
    setSelectedProductId(null);
    setSelectedBundleId(null);
    setActiveTab("products");
    setCompareA(null);
    setCompareB(null);
  }

  function sendPrompt(prompt) {
    if (typeof window.sendPrompt === "function") {
      window.sendPrompt(prompt);
      return;
    }
    console.log(prompt);
  }

  return (
    <div className="flex min-h-[640px] bg-slate-50 text-[13px]">
      <Sidebar
        filters={filters}
        onToggle={handleToggleFilter}
        onPriceChange={(maxPrice) => setFilters((current) => ({ ...current, maxPrice }))}
        onReset={resetFilters}
      />

      <main className="min-w-0 flex-1 overflow-y-auto p-4">
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          productCount={filteredProducts.length}
          compareCount={[compareA, compareB].filter(Boolean).length}
        />

        {activeTab === "products" && (
          <>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-900">Recommended products</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-500">
                {filteredProducts.length} match{filteredProducts.length !== 1 ? "es" : ""}
              </span>
            </div>

            <ProductGrid
              products={filteredProducts}
              selectedId={selectedProductId}
              compareA={compareA}
              compareB={compareB}
              onSelect={(id) => setSelectedProductId((current) => (current === id ? null : id))}
              onCompare={handleCompare}
              onReset={resetFilters}
              onAdvise={(product) => sendPrompt(`Tell me more about the ${product.name} — key selling points, who it's best for, and how I should pitch it to a customer.`)}
            />

            <ProductDetail
              product={selectedProduct}
              selectedBundle={selectedBundle}
              onClose={() => setSelectedProductId(null)}
            />
          </>
        )}

        {activeTab === "bundles" && (
          <BundleGrid
            bundles={filteredBundles}
            selectedBundleId={selectedBundleId}
            onSelect={(id) => setSelectedBundleId((current) => (current === id ? null : id))}
            onPitch={(bundle) => sendPrompt(`Give me a sales pitch for ${bundle.name} — key benefits, who it's best for, and how to handle objections about cost.`)}
          />
        )}

        {activeTab === "compare" && (
          <ComparePanel
            productA={productA}
            productB={productB}
            selectedBundle={selectedBundle}
            onRecommend={(a, b) => sendPrompt(`Compare the ${a.name} vs ${b.name} — which should I recommend for a business customer, and why?`)}
          />
        )}
      </main>
    </div>
  );
}
