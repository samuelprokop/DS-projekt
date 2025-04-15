import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./invoiceStyles";
import { formatInvoiceData } from "./invoiceDataFormatter";

const DELIVERY_FEE = 4.99;

const InvoiceTemplate = ({ order }) => {
  if (!order) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>Error: No order data provided</Text>
        </Page>
      </Document>
    );
  }
  const formattedOrder = formatInvoiceData(order, DELIVERY_FEE);
  if (!formattedOrder) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>Error: Invalid order data</Text>
        </Page>
      </Document>
    );
  }
  const sellerInfo = {
    name: "Autodiely.sk s.r.o.",
    address: "Karpatská 12, 821 05 Bratislava, Slovak Republic",
    ico: "12345678",
    dic: "SK1234567890",
    website: "http://localhost:5173",
    contact: "http://localhost:5173/contact",
    phone: "+1-556-643-9910",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>INVOICE - TAX DOCUMENT</Text>
          <Text style={{ marginTop: 5, fontSize: 10, alignSelf: "flex-end" }}>
            {formattedOrder.order_number}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.label}>Seller: {sellerInfo.name}</Text>
          <Text>{sellerInfo.address}</Text>
          <Text>
            Business ID: {sellerInfo.ico} | VAT ID: {sellerInfo.dic}
          </Text>
          <Text>
            Web: {sellerInfo.website} | Phone: {sellerInfo.phone}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Buyer:</Text>
          <Text>
            {formattedOrder.first_name} {formattedOrder.last_name}
          </Text>
          <Text>
            {formattedOrder.street}, {formattedOrder.zip_code}{" "}
            {formattedOrder.city}, {formattedOrder.country}
          </Text>
          <Text>
            Phone: {formattedOrder.phone} | Variable symbol:{" "}
            {formattedOrder.order_number}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colCode}>Code</Text>
            <Text style={styles.colDesc}>Name</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
            <Text style={styles.colVat}>VAT</Text>
          </View>
          {formattedOrder.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colCode}>{item.product_id}</Text>
              <Text style={styles.colDesc}>
                {item.name}
                {item.manufacturer && (
                  <Text style={{ fontSize: 8, color: "#333" }}>
                    {"\n"}
                    {item.manufacturer}
                  </Text>
                )}
              </Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{item.price} €</Text>
              <Text style={styles.colVat}>{item.vatAmount} €</Text>
            </View>
          ))}
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>NET PRICES</Text>
            <Text>Subtotal: {formattedOrder.subtotal} €</Text>
            <Text>Delivery: {formattedOrder.deliveryFee} €</Text>
            <Text style={styles.summaryTotal}>
              Total: {formattedOrder.total} €
            </Text>
            <Text style={styles.vatRate}>
              VAT Rate: {formattedOrder.taxRate}%
            </Text>
            <Text style={styles.vatAmount}>
              Total VAT: {formattedOrder.totalVat} €
            </Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>GROSS PRICES</Text>
            <Text>Subtotal: {formattedOrder.subtotalWithVat} €</Text>
            <Text>Delivery: {formattedOrder.deliveryFeeWithVat} €</Text>
            <Text style={styles.summaryTotal}>
              Total: {formattedOrder.totalWithVat} €
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Thank you for your purchase!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;
