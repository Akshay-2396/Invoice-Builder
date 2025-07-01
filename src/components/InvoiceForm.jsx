import LineItemRow from "./LineItemRow";

export default function InvoiceForm({ invoice, onUpdate }) {
  const handleChange = (field, value) => {
    onUpdate({ ...invoice, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoice.items];
    items[index][field] = value;

    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;

    onUpdate({ ...invoice, items, subtotal, taxAmount, total });
  };

  const addItem = () => {
    const items = [...invoice.items];

    if (items.length > 0 && !items[items.length - 1].description.trim()) {
      alert("Description can't be empty");
      return;
    }
    items.push({ description: "", quantity: 1, unitPrice: 0 });

    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;

    onUpdate({ ...invoice, items, subtotal, taxAmount, total });
  };

  const removeItem = (index) => {
    const items = invoice.items.filter((_, i) => i !== index);

    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;

    onUpdate({ ...invoice, items, subtotal, taxAmount, total });
  };
  const isFormValid =
    invoice.invoiceNumber &&
    invoice.billTo.name &&
    invoice.billTo.address &&
    invoice.billTo.phone &&
    /^\d{10}$/.test(invoice.billTo.phone);
  invoice.billTo.email && invoice.date && invoice.dueDate;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-bold text-center mb-4  text-emerald-800">
        Invoice Form
      </h2>

      <h3 className="font-bold mt-4 mb-2  text-emerald-800">Bill To</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
          placeholder="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={(e) => handleChange("invoiceNumber", e.target.value)}
        />

        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
          placeholder="Name"
          value={invoice.billTo.name}
          onChange={(e) =>
            onUpdate({
              ...invoice,
              billTo: { ...invoice.billTo, name: e.target.value },
            })
          }
        />
      </div>

      <textarea
        className="w-full p-2 border border-gray-300 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-emerald-800"
        placeholder="Address"
        value={invoice.billTo.address}
        onChange={(e) =>
          onUpdate({
            ...invoice,
            billTo: { ...invoice.billTo, address: e.target.value },
          })
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
          placeholder="Mobile"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          name="mobile"
          value={invoice.billTo.phone}
          onChange={(e) =>
            onUpdate({
              ...invoice,
              billTo: { ...invoice.billTo, phone: e.target.value },
            })
          }
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />

        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
          placeholder="Email"
          value={invoice.billTo.email}
          onChange={(e) =>
            onUpdate({
              ...invoice,
              billTo: { ...invoice.billTo, email: e.target.value },
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1 font-bold  text-emerald-800">
            Invoice Date:
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
            value={invoice.date}
            onChange={(e) => {
              const selectedDate = e.target.value;
              const due = new Date(selectedDate);
              due.setDate(due.getDate() + 7);
              const dueDateFormatted = due.toISOString().split("T")[0];

              onUpdate({
                ...invoice,
                date: selectedDate,
                dueDate: dueDateFormatted,
              });
            }}
          />
        </div>

        <div>
          <label className="block mb-1 font-bold  text-emerald-800">
            Due Date:
          </label>
          <input
            type="date"
            name="dueDate"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-800"
            value={invoice.dueDate || ""}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </div>
      </div>

      <h3 className="font-bold mt-6 mb-2  text-emerald-800">Items</h3>

      <div className="space-y-4">
        {invoice.items.map((item, index) => (
          <LineItemRow
            key={index}
            index={index}
            item={item}
            onItemChange={handleItemChange}
            onRemove={removeItem}
          />
        ))}
      </div>

      <label className="block mt-6 mb-1 font-bold  text-emerald-800">
        Tax Rate (%)
      </label>
      <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-800"
        value={invoice.taxRate}
        onChange={(e) => {
          const taxRate = parseFloat(e.target.value) || 0;

          const subtotal = invoice.items.reduce(
            (acc, item) => acc + item.quantity * item.unitPrice,
            0
          );
          const taxAmount = subtotal * (taxRate / 100);
          const total = subtotal + taxAmount;

          onUpdate({
            ...invoice,
            taxRate,
            subtotal,
            taxAmount,
            total,
          });
        }}
      />

      <div className="flex justify-center sm:justify-end">
        <button
          className={`mt-4 px-6 py-2 rounded transition ${
            isFormValid
              ? "bg-emerald-900 hover:bg-emerald-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={addItem}
          disabled={!isFormValid}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
