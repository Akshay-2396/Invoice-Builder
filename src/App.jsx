import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import { createEmptyInvoice } from "./models/invoiceModel";
import { calculateTotals } from "./controllers/invoiceController";

function App() {
  const [invoice, setInvoice] = useState(createEmptyInvoice());

  useEffect(() => {
    const updatedInvoice = calculateTotals(invoice);
    setInvoice(updatedInvoice);
  }, [JSON.stringify(invoice.items)]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <div className="bg-white p-4 rounded shadow-md flex flex-col">
          <InvoiceForm invoice={invoice} onUpdate={setInvoice} />
        </div>
        <div className="bg-white p-4 rounded shadow-md flex flex-col justify-between">
          <InvoicePreview invoice={invoice} />
        </div>
      </div>
    </div>
  );
}

export default App;
