import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { styles } from "./invoiceStyles";

const DELIVERY_FEE = 4.99;

const formatInvoiceData = (order, deliveryFee) => {
  if (!order) return null;

  const taxRate = 20;

  const subtotal = order.items.reduce((sum, item) => {
    const price =
      typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const totalVat = subtotal * (taxRate / 100);
  const totalWithVat = subtotal + totalVat + deliveryFee;

  return {
    order_number: order.order_number || order._id,
    customer_name: order.customer_name || "N/A",
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    items: order.items.map((item) => {
      const price =
        typeof item.price === "number"
          ? item.price
          : parseFloat(item.price) || 0;
      return {
        product_id: item.product_id || "N/A",
        name: item.name || "Unnamed Product",
        manufacturer: item.manufacturer,
        quantity: item.quantity || 1,
        price: price.toFixed(2),
        vatAmount: (price * (taxRate / 100)).toFixed(2),
      };
    }),
    subtotal: subtotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    taxRate,
    totalVat: totalVat.toFixed(2),
    totalWithVat: totalWithVat.toFixed(2),
  };
};

const InvoiceTemplate = ({ order }) => {
  if (!order)
    return (
      <Document>
        <Page style={styles.page}>
          <Text>Error: No order data provided</Text>
        </Page>
      </Document>
    );

  const formattedOrder = formatInvoiceData(order, DELIVERY_FEE);
  if (!formattedOrder)
    return (
      <Document>
        <Page style={styles.page}>
          <Text>Error: Invalid order data</Text>
        </Page>
      </Document>
    );

  const sellerInfo = {
    name: "Autodiely.sk s.r.o.",
    address: "Karpatská 12, 821 05 Bratislava",
    ico: "12345678",
    dic: "SK1234567890",
    phone: "+421 123 456 789",
    email: "info@autodiely.sk",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
          </View>
          <Text style={styles.invoiceNumber}>
            Invoice No: {formattedOrder.order_number}
          </Text>
        </View>

        <View style={styles.divider} />
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.label}>Seller:</Text>
            <Text>{sellerInfo.name}</Text>
            <Text>{sellerInfo.address}</Text>
            <Text>ICO: {sellerInfo.ico}</Text>
            <Text>DIC: {sellerInfo.dic}</Text>
            <Text>Tel: {sellerInfo.phone}</Text>
            <Text>Email: {sellerInfo.email}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Buyer:</Text>
            <Text>{formattedOrder.customer_name}</Text>
            {formattedOrder.customer_email && (
              <Text>Email: {formattedOrder.customer_email}</Text>
            )}
            {formattedOrder.customer_phone && (
              <Text>Tel: {formattedOrder.customer_phone}</Text>
            )}
            <Text>VS: {formattedOrder.order_number}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colCode}>Code</Text>
            <Text style={styles.colDesc}>Product</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
            <Text style={styles.colVat}>VAT</Text>
          </View>

          {formattedOrder.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colCode}>{item.product_id}</Text>
              <View style={styles.colDesc}>
                <Text>{item.name}</Text>
                {item.manufacturer && (
                  <Text style={{ fontSize: 8, color: "#666" }}>
                    {item.manufacturer}
                  </Text>
                )}
              </View>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{item.price}</Text>
              <Text style={styles.colVat}>{item.vatAmount}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>PAYMENT SUMMARY</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal:</Text>
              <Text>{formattedOrder.subtotal} €</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery:</Text>
              <Text>{formattedOrder.deliveryFee} €</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>VAT ({formattedOrder.taxRate}%):</Text>
              <Text>{formattedOrder.totalVat} €</Text>
            </View>
            <View style={styles.summaryTotal}>
              <Text>TOTAL:</Text>
              <Text>{formattedOrder.totalWithVat} €</Text>
            </View>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>PAYMENT INFORMATION</Text>
            <Text>Bank: SLSP</Text>
            <Text>IBAN: SK12 3456 7890 1234 5678 9012</Text>
            <Text>SWIFT: GIBASKBX</Text>
            <Text style={{ marginTop: 10 }}>Due Date: 14 days</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>Autodiely.sk - Your trusted car parts supplier</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;