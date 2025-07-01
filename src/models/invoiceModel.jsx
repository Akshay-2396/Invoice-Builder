export function createEmptyInvoice() {
  return {
    invoiceNumber: "",
    date: "",
    duedate: "",
    billTo: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    items: [],
    subtotal: 0,
    taxRate: [],
    taxAmount: 0,
    total: 0,
  };
}
