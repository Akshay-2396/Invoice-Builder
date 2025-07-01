import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InvoicePreview({ invoice }) {
  const invoiceRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleDownloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return console.error("Invoice DOM not found");

    try {
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice.invoiceNumber || "invoice"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  return (
    <>
      <div
        className="p-4 sm:p-6 rounded-lg shadow-md mt-6 bg-white max-w-full overflow-x-auto"
        ref={invoiceRef}
      >
        <div
          className="font-sans text-sm max-w-4xl mx-auto border p-4 sm:p-6 bg-white"
          style={{ color: "#111827", borderColor: "#D1D5DB" }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "#047857" }}>
                Ad4tech Material LLC
              </h2>
              <p style={{ color: "#374151" }}>
                67th, Martin street
                <br />
                Alexander road
                <br />
                576832
                <br />
                Mobile: +123456789
                <br />
                Email: ad4example@gmail.com
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xl font-bold" style={{ color: "#047857" }}>
                INVOICE
              </p>
              <div className="w-20 h-10 mt-3">
                <img src="/logo.png" alt="company logo" />
              </div>
            </div>
          </div>

          {/* Bill To & Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <strong className="text-sm">Bill To</strong>
              <p className="mt-1 text-sm break-words whitespace-normal">
                {invoice.billTo?.name && (
                  <>
                    {invoice.billTo.name}
                    <br />
                  </>
                )}
                {invoice.billTo?.address && (
                  <>
                    {invoice.billTo.address}
                    <br />
                  </>
                )}
                {invoice.billTo?.phone && (
                  <>
                    Mobile: {invoice.billTo.phone}
                    <br />
                  </>
                )}
                {invoice.billTo?.email && <>Email: {invoice.billTo.email}</>}
              </p>
            </div>
            <div>
              <p>
                <strong>Invoice No:</strong> {invoice.invoiceNumber}
              </p>
              <p>
                <strong>Invoice Date:</strong> {formatDate(invoice.date)}
              </p>
              <p>
                <strong>Due Date:</strong> {formatDate(invoice.dueDate)}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse mb-4 text-sm">
              <thead>
                <tr style={{ backgroundColor: "#047857", color: "#ffffff" }}>
                  <th className="p-2 border" style={{ borderColor: "#D1D5DB" }}>
                    Sl.
                  </th>
                  <th className="p-2 border" style={{ borderColor: "#D1D5DB" }}>
                    Description
                  </th>
                  <th className="p-2 border" style={{ borderColor: "#D1D5DB" }}>
                    Qty
                  </th>
                  <th className="p-2 border" style={{ borderColor: "#D1D5DB" }}>
                    Rate
                  </th>
                  <th className="p-2 border" style={{ borderColor: "#D1D5DB" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="p-2 border break-words whitespace-normal"
                      style={{ borderColor: "#D1D5DB" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="p-2 border break-words whitespace-normal max-w-[200px]"
                      style={{ borderColor: "#D1D5DB" }}
                    >
                      {item.description}
                    </td>
                    <td
                      className="p-2 border"
                      style={{ borderColor: "#D1D5DB" }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      className="p-2 border"
                      style={{ borderColor: "#D1D5DB" }}
                    >
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td
                      className="p-2 border"
                      style={{ borderColor: "#D1D5DB" }}
                    >
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
            <div className="text-left">
              <p style={{ color: "#047857" }} className="font-bold">
                Payment Instructions
              </p>
              <div
                className="border-t w-32 mt-1"
                style={{ borderColor: "#047857" }}
              ></div>
              <p>
                Pay Cheque to
                <br />
                John Doe
              </p>
            </div>
            <div>
              <p>
                <strong>Subtotal:</strong> ${(invoice.subtotal || 0).toFixed(2)}
              </p>
              <div
                className="border-t w-full mt-2"
                style={{ borderColor: "#047857" }}
              ></div>
              <p>
                <strong>Tax ({invoice.taxRate || 0}%):</strong> $
                {(invoice.taxAmount || 0).toFixed(2)}
              </p>
              <p>
                <strong>Total:</strong> ${(invoice.total || 0).toFixed(2)}
              </p>
              <div
                className="border-t w-full mt-2"
                style={{ borderColor: "#047857" }}
              ></div>
              <p>
                <strong>Paid:</strong> $0.00
              </p>
              <p>
                <strong>Balance Due:</strong> ${(invoice.total || 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-6">
            <p className="text-left">Authorized Signatory</p>
            <div
              className="h-12 border-t w-32 mt-1"
              style={{ borderColor: "#6B7280" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end mt-4">
        <button
          onClick={handleDownloadPDF}
          className="  bg-[#108981] hover:bg-[#059669] text-white px-4 py-2 rounded shadow-lg transition-colors duration-200 "
        >
          Download PDF
        </button>
      </div>
    </>
  );
}
