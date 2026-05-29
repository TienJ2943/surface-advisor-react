import { money } from "../utils/format";

function getCompareRows(a, b) {
  return [
    { label: "Price", a: money(a.price), b: money(b.price), winner: a.price <= b.price ? "A" : "B" },
    { label: "Processor", a: a.proc, b: b.proc },
    { label: "RAM", a: a.ram, b: b.ram, winner: parseInt(a.ram) >= parseInt(b.ram) ? "A" : "B" },
    { label: "Storage", a: a.stor, b: b.stor, winner: parseInt(a.stor) >= parseInt(b.stor) ? "A" : "B" },
    { label: "Display", a: a.disp, b: b.disp },
    { label: "Weight", a: a.wt, b: b.wt, winner: parseFloat(a.wt) <= parseFloat(b.wt) ? "A" : "B" },
    { label: "Battery", a: a.bat, b: b.bat, winner: parseInt(a.bat) >= parseInt(b.bat) ? "A" : "B" },
    { label: "Category", a: a.cat, b: b.cat },
    { label: "Brand", a: a.brand, b: b.brand },
  ];
}

function WinnerBadge({ winner, slot }) {
  if (winner !== slot) return null;
  return <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${slot === "A" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>Better</span>;
}

export default function ComparePanel({ productA, productB, selectedBundle, onRecommend }) {
  if (!productA && !productB) {
    return (
      <div className="py-6 text-center text-xs text-slate-500">
        Go to Products tab and click “+ Compare” on two devices to compare them here.
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-900">Side-by-side comparison</h2>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-[11px] text-slate-400">Green <strong>A</strong> vs Orange <strong>B</strong> — “Better” highlights the winning spec.</p>
        <div className="mb-2 grid grid-cols-[120px_1fr_1fr] gap-2.5 text-xs">
          <div className="text-[11px] text-slate-400">Spec</div>
          <div className="font-medium text-[#107C10]">{productA?.name || "— pick a product"}</div>
          <div className="font-medium text-[#D83B01]">{productB?.name || "— pick a product"}</div>
        </div>

        {productA && productB ? (
          getCompareRows(productA, productB).map((row) => (
            <div key={row.label} className="grid grid-cols-[120px_1fr_1fr] gap-2.5 border-t border-slate-200 py-1.5 text-xs">
              <div className="text-[11px] text-slate-400">{row.label}</div>
              <div className="text-slate-900">{row.a}<br /><WinnerBadge winner={row.winner} slot="A" /></div>
              <div className="text-slate-900">{row.b}<br /><WinnerBadge winner={row.winner} slot="B" /></div>
            </div>
          ))
        ) : (
          <p className="py-3 text-xs text-slate-500">Select a second product from the Products tab to compare.</p>
        )}

        {productA && productB && (
          <button type="button" onClick={() => onRecommend(productA, productB)} className="mt-3 w-full rounded-lg border border-[#0078D4] px-3.5 py-2 text-xs text-[#0078D4] hover:bg-blue-50">
            Get advisor recommendation ↗
          </button>
        )}
      </section>

      {selectedBundle && (productA || productB) && (
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-slate-100 px-3.5 py-2.5">
          <span className="text-xs text-slate-500">Add {selectedBundle.name} to bundle</span>
          <strong className="text-base font-medium text-slate-900">{money(selectedBundle.price)}/{selectedBundle.period}</strong>
        </div>
      )}
    </>
  );
}
