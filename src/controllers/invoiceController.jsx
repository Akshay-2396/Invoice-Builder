export function calculateTotals(invoice) {
  const items = invoice.items.map((item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    return {
      ...item,
      total: quantity * unitPrice,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const total = subtotal;

  return {
    ...invoice,
    items,
    subtotal,
    total,
  };
}
