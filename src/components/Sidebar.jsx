import FilterChip from "./FilterChip";
import { BRANDS, CATEGORIES, RAMS, USES } from "../data/filterOptions";
import React from "react";

function Section({ label, children }) {
  return (
    <section className="mt-4">
      <h3 className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-slate-400">{label}</h3>
      {children}
    </section>
  );
}

export default function Sidebar({ filters, onToggle, onPriceChange, onReset }) {
  return (
    <aside className="w-[260px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3.5">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <rect x="0" y="0" width="10" height="10" fill="#F25022" />
          <rect x="12" y="0" width="10" height="10" fill="#7FBA00" />
          <rect x="0" y="12" width="10" height="10" fill="#00A4EF" />
          <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
        </svg>
        <div>
          <p className="text-[13px] font-medium text-slate-900">Surface Advisor</p>
          <p className="text-[10px] text-slate-500">Product recommender</p>
        </div>
      </div>

      <Section label="Use case">
        <div className="flex flex-wrap gap-1.5">
          {USES.map((use) => (
            <FilterChip key={use} active={filters.uses.includes(use)} onClick={() => onToggle("uses", use)}>
              {use}
            </FilterChip>
          ))}
        </div>
      </Section>

      <Section label="Budget">
        <div className="flex items-center gap-2">
          <input
            className="w-full"
            type="range"
            min="400"
            max="3200"
            step="50"
            value={filters.maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
          />
          <span className="min-w-[52px] text-right text-xs font-medium text-slate-900">
            ${filters.maxPrice.toLocaleString()}
          </span>
        </div>
      </Section>

      <Section label="Form factor">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <FilterChip key={cat} active={filters.cats.includes(cat)} onClick={() => onToggle("cats", cat)}>
              {cat}
            </FilterChip>
          ))}
        </div>
      </Section>

      <Section label="RAM">
        <div className="flex flex-wrap gap-1.5">
          {RAMS.map((ram) => (
            <FilterChip key={ram} active={filters.ram.includes(ram)} onClick={() => onToggle("ram", ram)}>
              {ram}
            </FilterChip>
          ))}
        </div>
      </Section>

      <Section label="Brand">
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((brand) => (
            <FilterChip key={brand} active={filters.brands.includes(brand)} onClick={() => onToggle("brands", brand)}>
              {brand}
            </FilterChip>
          ))}
        </div>
      </Section>

      <button type="button" onClick={onReset} className="mt-6 text-[11px] text-[#0078D4] hover:underline">
        Reset filters
      </button>
    </aside>
  );
}
