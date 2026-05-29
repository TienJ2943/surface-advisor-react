import { money } from "../utils/format";

export default function BundleCard({ bundle, selected, onSelect }) {
  return (
    <article
      onClick={() => onSelect(bundle.id)}
      className={`cursor-pointer rounded-lg bg-slate-100 p-2.5 transition hover:border-[#0078D4] ${
        selected ? "border-2 border-[#0078D4]" : "border border-slate-200"
      }`}
    >
      <h3 className="mb-0.5 text-xs font-medium text-slate-900">{bundle.name}</h3>
      <p className="mb-1.5 text-[11px] text-[#0078D4]">{bundle.price === 0 ? "Free" : `${money(bundle.price)}/${bundle.period}`}</p>
      <div className="text-[10px] leading-5 text-slate-500">
        {bundle.features.map((feature) => (
          <p key={feature}>✓ {feature}</p>
        ))}
      </div>
      <p className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-[10px] text-blue-700">{bundle.why}</p>
    </article>
  );
}
