import { money } from "../utils/format";

export default function ProductCard({
  product,
  selected,
  compareSlot,
  onSelect,
  onCompare,
  onAdvise,
}) {
  const compareClass =
    compareSlot === "A"
      ? "border-2 border-[#107C10]"
      : compareSlot === "B"
        ? "border-2 border-[#D83B01]"
        : "border border-slate-200";

  return (
    <article
      onClick={() => onSelect(product.id)}
      className={`relative cursor-pointer overflow-hidden rounded-xl bg-white transition hover:border-[#0078D4] ${
        selected ? "border-2 border-[#0078D4]" : compareClass
      }`}
    >
      {compareSlot && (
        <span
          className={`absolute right-1.5 top-1.5 z-10 rounded-full px-2 py-0.5 text-[10px] font-medium ${
            compareSlot === "A"
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {compareSlot}
        </span>
      )}

      <div className="relative flex h-[120px] items-center justify-center bg-slate-100">
        <div className="absolute left-1.5 top-1.5 z-10 flex flex-wrap gap-1">
          {product.uses.map((use) => (
            <span
              key={use}
              className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-700"
            >
              {use.charAt(0).toUpperCase() + use.slice(1)}
            </span>
          ))}

          
        </div>

        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain p-3"
          />
        ) : (
          <span className="text-5xl text-slate-300">▭</span>
        )}
      </div>

      <div className="p-2.5">
        <h3 className="mb-0.5 text-xs font-medium text-slate-900">
          {product.name}
        </h3>

        <p className="mb-2 text-[10px] text-slate-500">{product.tag}</p>

        <div className="mb-2 flex flex-wrap gap-1">
          {product.specs.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-500"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] text-slate-400">From</p>
            <p className="text-[13px] font-medium text-slate-900">
              {money(product.price)}
            </p>
          </div>

          <div className="flex gap-1">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onCompare(product.id);
              }}
              className="rounded border border-slate-300 px-2 py-1 text-[10px] text-slate-600 hover:bg-slate-100"
            >
              {compareSlot ? `Remove ${compareSlot}` : "+ Compare"}
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onAdvise(product);
              }}
              className="rounded border border-[#0078D4] px-2 py-1 text-[10px] text-[#0078D4] hover:bg-blue-50"
            >
              Advise ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}