import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

const BranchInvoices = ({ token }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/branch/invoices`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setInvoices(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch invoices');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [token]);
 
  const handleDownload = (invoice) => (
    <PDFDownloadLink
      document={<InvoiceTemplate order={invoice} />}
      fileName={`invoice_${invoice.order_number}.pdf`}
    >
      {({ loading }) => (
        <button
          className="bg-black text-white text-sm px-4 py-1 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : 'Download'}
        </button>
      )}
    </PDFDownloadLink>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Branch Invoices</h2>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Order Number</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice._id} className="border-t">
                  <td className="px-6 py-4">{invoice._id}</td>
                  <td className="px-6 py-4">{invoice.order_number}</td>
                  <td className="px-6 py-4">{handleDownload(invoice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BranchInvoices;