import ProductCard from "./ProductCard";

export default function ProductGrid({ products, selectedId, compareA, compareB, onSelect, onCompare, onReset, onAdvise }) {
  if (!products.length) {
    return (
      <div className="py-10 text-center text-sm text-slate-500">
        No products match.
        <br />
        <button type="button" onClick={onReset} className="mt-2 text-xs text-[#0078D4] hover:underline">
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          selected={selectedId === product.id}
          compareSlot={compareA === product.id ? "A" : compareB === product.id ? "B" : null}
          onSelect={onSelect}
          onCompare={onCompare}
          onAdvise={onAdvise}
        />
      ))}
    </div>
  );
}
