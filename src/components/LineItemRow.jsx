import React from "react";

export default function LineItemRow({ item, index, onItemChange, onRemove }) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-2">
      <textarea
        className="w-full p-2 border border-gray-300 rounded resize-y min-h-[60px] break-words whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-emerald-800"
        placeholder="Description"
        value={item.description}
        onChange={(e) => onItemChange(index, "description", e.target.value)}
      />
      <input
        type="number"
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) =>
          onItemChange(index, "quantity", parseInt(e.target.value))
        }
      />
      <input
        type="number"
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
        placeholder="Unit Price"
        value={item.unitPrice}
        onChange={(e) =>
          onItemChange(index, "unitPrice", parseFloat(e.target.value))
        }
      />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
}
