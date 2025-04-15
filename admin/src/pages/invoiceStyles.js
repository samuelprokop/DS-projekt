import {
  StyleSheet
} from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
      padding: 40,
      fontSize: 10,
      fontFamily: 'Helvetica'
  },
  headerContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
  },
  title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10
  },
  invoiceNumber: {
      fontSize: 10,
      textAlign: 'right'
  },
  divider: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      marginVertical: 10
  },
  section: {
      marginBottom: 15
  },
  twoColumn: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  column: {
      width: '48%'
  },
  label: {
      fontWeight: 'bold',
      marginBottom: 3
  },
  table: {
      display: 'table',
      width: '100%',
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#e0e0e0'
  },
  tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f5f5f5',
      borderBottomWidth: 1,
      borderBottomColor: '#333'
  },
  tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0'
  },
  colCode: {
      width: '12%',
      padding: 5,
      textAlign: 'center'
  },
  colDesc: {
      width: '40%',
      padding: 5
  },
  colQty: {
      width: '10%',
      padding: 5,
      textAlign: 'center'
  },
  colPrice: {
      width: '18%',
      padding: 5,
      textAlign: 'right'
  },
  colVat: {
      width: '18%',
      padding: 5,
      textAlign: 'right',
      color: '#666'
  },
  summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30
  },
  summaryBox: {
      width: '48%',
      borderWidth: 1,
      borderColor: '#333',
      padding: 10
  },
  summaryTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      fontSize: 11
  },
  summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  summaryTotal: {
      fontWeight: 'bold',
      marginTop: 8,
      fontSize: 12,
      borderTopWidth: 1,
      borderTopColor: '#333',
      paddingTop: 5
  },
  footer: {
      marginTop: 40,
      textAlign: 'center',
      fontSize: 10,
      color: '#888'
  }
});
