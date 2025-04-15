export const getProductNameById = (productId) => {
  const id = parseInt(productId, 10);

  if (id === 1) return "Alternator";
  if (id === 2) return "Brzdova kvapalina";
  if (id === 3) return "Brzdove dosticky";
  if (id === 4) return "Brzdove kotuce";
  if (id === 5) return "Cistic brzd";
  if (id === 6) return "Cistic interieru";
  if (id === 7) return "Chladiaca kvapalina";
  if (id === 8) return "Chladic";
  if (id === 9) return "DPF filter";
  if (id === 10) return "Hlavny brzdovy valec";
  if (id === 11) return "Katalyzator";
  if (id === 12) return "Ochrana proti korozii";
  if (id === 13) return "Olejovy filter";
  if (id === 14) return "Palivove cerpadlo";
  if (id === 15) return "Palivovy filter";
  if (id === 16) return "Impregnacia pneumatik";
  if (id === 17) return "Katalyzator";
  if (id === 18) return "Klinovy remen";
  if (id === 19) return "Kolesove lozisko";
  if (id === 20) return "Klikovy hriadel";
  if (id === 21) return "Kryt motora";
  if (id === 22) return "Lambda sonda";
  if (id === 23) return "Lozisko klikoveho hriadela";
  if (id === 24) return "Motorovy olej 10W-40";
  if (id === 25) return "Ochrana proti korozii";
  if (id === 26) return "Rozvodova retaz";
  if (id === 27) return "Spojkova sada";
  if (id === 28) return "Stieracova guma (par)";
  if (id === 29) return "Svetlomet (lavy)";
  if (id === 30) return "Svetlomet (pravy)";
  if (id === 31) return "Starter";
  if (id === 32) return "Startovacie kable";
  if (id === 33) return "Tlmic pruzenia";
  if (id === 34) return "Turbo kompresor";
  if (id === 35) return "Vodna pumpa";
  if (id === 36) return "Vosk na karoseriu";
  if (id === 37) return "Vstrekovacie cerpadlo";
  if (id === 38) return "Vzduchovy filter";
  if (id === 39) return "Zapalovacia cievka";
  if (id === 40) return "Zapalovacia sviecka";

  return `Unknown Product (ID: ${productId})`;
};

export const formatInvoiceData = (order, deliveryFee = 4.99) => {
  if (!order || !order.items) {
      console.error('Invalid order data in formatInvoiceData');
      return null;
  }

  const VAT_RATE = 0.20;

  const formattedItems = order.items.map(item => {
      const quantity = parseInt(item.quantity, 10) || 1;
      const priceWithVat = typeof item.unit_price === 'number' ?
          item.unit_price :
          parseFloat(item.unit_price) || 0;
      const priceWithoutVat = priceWithVat / (1 + VAT_RATE);
      const vatAmount = priceWithVat - priceWithoutVat;

      return {
          product_id: item.product_id,
          name: getProductNameById(item.product_id),
          manufacturer: item.manufacturer,
          quantity,
          price: priceWithVat.toFixed(2),
          priceWithoutVat: priceWithoutVat.toFixed(2),
          vatAmount: vatAmount.toFixed(2),
          totalWithVat: (priceWithVat * quantity).toFixed(2),
          totalWithoutVat: (priceWithoutVat * quantity).toFixed(2),
          totalVat: (vatAmount * quantity).toFixed(2)
      };
  });

  const subtotalWithVat = formattedItems.reduce((sum, item) =>
      sum + parseFloat(item.totalWithVat), 0);

  const subtotalWithoutVat = formattedItems.reduce((sum, item) =>
      sum + parseFloat(item.totalWithoutVat), 0);

  const totalVat = formattedItems.reduce((sum, item) =>
      sum + parseFloat(item.totalVat), 0);

  const deliveryWithoutVat = deliveryFee / (1 + VAT_RATE);
  const deliveryVat = deliveryFee - deliveryWithoutVat;

  const totalWithVat = subtotalWithVat + deliveryFee;
  const totalWithoutVat = subtotalWithoutVat + deliveryWithoutVat;
  const totalVatAmount = totalVat + deliveryVat;

  const formattedOrder = {
      ...order,
      items: formattedItems,
      subtotal: subtotalWithoutVat.toFixed(2),
      subtotalWithVat: subtotalWithVat.toFixed(2),
      deliveryFee: deliveryWithoutVat.toFixed(2),
      deliveryFeeWithVat: deliveryFee.toFixed(2),
      total: totalWithoutVat.toFixed(2),
      totalWithVat: totalWithVat.toFixed(2),
      totalVat: totalVatAmount.toFixed(2),
      taxRate: (VAT_RATE * 100).toFixed(0)
  };

  return formattedOrder;
};
