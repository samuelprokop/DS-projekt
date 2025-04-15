import {
  StyleSheet
} from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
      padding: 40,
      fontSize: 10,
      fontFamily: 'Helvetica',
  },
  headerContainer: {
      marginBottom: 20,
  },
  title: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
  },
  divider: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      marginVertical: 10,
  },
  section: {
      marginBottom: 15,
  },
  label: {
      fontWeight: 'bold',
  },
  table: {
      display: 'table',
      width: 'auto',
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#e0e0e0',
  },
  tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#333',
      borderBottomStyle: 'solid',
      paddingBottom: 5,
      backgroundColor: '#f5f5f5',
  },
  tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      paddingVertical: 4,
      alignItems: 'center',
  },
  colCode: {
      width: '12%',
      textAlign: 'center',
      paddingHorizontal: 2,
  },
  colDesc: {
      width: '40%',
      paddingHorizontal: 5,
      textAlign: 'left',
  },
  colQty: {
      width: '10%',
      textAlign: 'center',
      paddingHorizontal: 2,
  },
  colPrice: {
      width: '18%',
      textAlign: 'center',
      paddingHorizontal: 2,
  },
  colVat: {
      width: '18%',
      textAlign: 'center',
      paddingHorizontal: 2,
      color: '#666',
  },
  summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
  },
  summaryBox: {
      width: '48%',
      borderWidth: 1,
      borderColor: '#333',
      padding: 10,
      backgroundColor: '#f9f9f9',
  },
  summaryTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      fontSize: 11,
  },
  summaryTotal: {
      fontWeight: 'bold',
      marginTop: 8,
      fontSize: 12,
      borderTopWidth: 1,
      borderTopColor: '#333',
      paddingTop: 5,
  },
  vatRate: {
      marginTop: 8,
      fontSize: 10,
      color: '#666',
  },
  vatAmount: {
      marginTop: 4,
      fontSize: 10,
      fontWeight: 'bold',
  },
  footer: {
      marginTop: 40,
      textAlign: 'center',
      fontSize: 10,
      color: '#888',
  },
});
