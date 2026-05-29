const tabs = [
  { id: "products", label: "Products" },
  { id: "bundles", label: "M365 Bundles" },
  { id: "compare", label: "Compare" },
];

export default function Tabs({ activeTab, onChange, productCount, compareCount }) {
  const labelWithCount = (tab) => {
    if (tab.id === "products") return `${tab.label} (${productCount})`;
    if (tab.id === "compare" && compareCount > 0) return `${tab.label} (${compareCount})`;
    return tab.label;
  };

  return (
    <div className="mb-3.5 flex overflow-hidden rounded-lg border border-slate-300 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`flex-1 px-2 py-2 text-center text-xs transition ${
            activeTab === tab.id ? "bg-[#0078D4] font-medium text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {labelWithCount(tab)}
        </button>
      ))}
    </div>
  );
}
