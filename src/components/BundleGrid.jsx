import BundleCard from "./BundleCard";
import { money } from "../utils/format";

export default function BundleGrid({ bundles, selectedBundleId, onSelect, onPitch }) {
  const selectedBundle = bundles.find((bundle) => bundle.id === selectedBundleId);

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-900">Microsoft 365 bundles</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-500">{bundles.length} plans</span>
      </div>
      <p className="mb-3 text-[11px] text-slate-500">Select a plan to pair with a device recommendation. Use-case filter applies.</p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} selected={selectedBundleId === bundle.id} onSelect={onSelect} />
        ))}
      </div>

      {selectedBundle && (
        <>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-100 px-3.5 py-2.5">
            <span className="text-xs text-slate-500">Selected: {selectedBundle.name}</span>
            <strong className="text-base font-medium text-slate-900">
              {selectedBundle.price === 0 ? "Free" : `${money(selectedBundle.price)}/${selectedBundle.period}`}
            </strong>
          </div>
          <button
            type="button"
            onClick={() => onPitch(selectedBundle)}
            className="mt-2 w-full rounded-lg border border-[#0078D4] px-3.5 py-2 text-xs text-[#0078D4] hover:bg-blue-50"
          >
            Get pitch for {selectedBundle.name} ↗
          </button>
        </>
      )}
    </>
  );
}
