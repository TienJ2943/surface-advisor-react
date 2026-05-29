import { money } from "../utils/format";
import React from "react";


const rows = [
  ["Category", "cat"],
  ["Processor", "proc"],
  ["RAM", "ram"],
  ["Storage", "stor"],
  ["Display", "disp"],
  ["Weight", "wt"],
  ["Battery", "bat"],
];

export default function ProductDetail({ product, selectedBundle, onClose }) {
  if (!product) return null;

  return (
    <section className="mt-3.5 rounded-xl border border-slate-200 bg-white p-4">
      <button type="button" onClick={onClose} aria-label="Close" className="float-right text-base text-slate-500 hover:text-slate-900">
        ×
      </button>
      <h3 className="mb-1 text-sm font-medium text-slate-900">{product.name}</h3>
      <p className="mb-3 text-xs text-slate-500">{product.tag}</p>

      <table className="w-full table-fixed border-collapse text-xs">
        <tbody>
          {rows.map(([label, key]) => (
            <tr key={key} className="border-b border-slate-200">
              <td className="w-[42%] py-1.5 text-slate-500">{label}</td>
              <td className="py-1.5 font-medium text-slate-900">{product[key]}</td>
            </tr>
          ))}
          <tr className="border-b border-slate-200">
            <td className="w-[42%] py-1.5 text-slate-500">Starting price</td>
            <td className="py-1.5 font-medium text-slate-900">{money(product.price)}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-[11px] text-blue-700">
        <strong className="mb-1 block text-[10px] uppercase tracking-widest">Advisor note</strong>
        {product.why}
      </div>

      {selectedBundle && (
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-slate-100 px-3.5 py-2.5">
          <span className="text-xs text-slate-500">Device + {selectedBundle.name}</span>
          <strong className="text-base font-medium text-slate-900">
            {money(product.price)} + {money(selectedBundle.price)}/{selectedBundle.period}
          </strong>
        </div>
      )}
    </section>
  );
}
