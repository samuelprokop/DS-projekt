import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewBranchInventory = ({ token }) => {
  const navigate = useNavigate();

  const [openBranchDropdown, setOpenBranchDropdown] = useState(false);
  const [branchChosen, setBranchChosen] = useState(null);
  const cities = ['Bratislava', 'Košice', 'Nitra', 'Poprad', 'Senec'].sort();

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getBranchCode = (city) => {
    const branchMap = {
      'Bratislava': 'bl',
      'Košice': 'ke',
      'Nitra': 'nr',
      'Poprad': 'pp',
      'Senec': 'sc'
    };
    return branchMap[city];
  };

  useEffect(() => {
    const fetchInventory = async () => {
      if (!branchChosen) return;

      try {
        setLoading(true);
        const branchCode = getBranchCode(branchChosen);
        const response = await axios.get(`${backendUrl}/api/branch/inventory/${branchCode}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setInventory(response.data.data.inventory);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch inventory');
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [branchChosen, token]);

  const filteredInventory = inventory.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.product_name.toLowerCase().includes(searchLower) ||
      (item.manufacturer && item.manufacturer.toLowerCase().includes(searchLower)) ||
      item.product_id.toString().includes(searchTerm)
    );
  });

  const handleSellClick = (product) => {
    navigate('/branch-sell', {
      state: {
        productData: {
          name: product.product_name,
          product_id: product.product_id,
          manufacturer: product.manufacturer,
          max_qty: product.qty,
          branch: branchChosen
        }
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 border-b border-gray-200">
        View Branch Inventory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 hover:border-gray-200 transition-colors">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
            Branch Selection
          </h4>
          <div className="mt-1">
            <div className="relative">
              <button
                className={`flex items-center justify-between w-full border ${branchChosen ? 'border-black' : 'border-gray-200'} rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-left transition-all hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black`}
                onClick={() => setOpenBranchDropdown(!openBranchDropdown)}
              >
                <span className={`text-sm ${branchChosen ? 'text-gray-800' : 'text-gray-400'}`}>
                  {branchChosen || 'Select a branch...'}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform text-gray-400 ${openBranchDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openBranchDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {cities.map((city) => (
                    <button
                      key={city}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${branchChosen === city ? 'bg-gray-50 text-black font-medium' : 'text-gray-700'}`}
                      onClick={() => {
                        setBranchChosen(city);
                        setOpenBranchDropdown(false);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 hover:border-gray-200 transition-colors">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
            Search Inventory
          </h4>
          <div className="mt-1">
            <input
              type="text"
              placeholder="Search by part name, manufacturer or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 overflow-x-auto">
        <h3 className="font-medium text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider border-b pb-2">
          {branchChosen ? `${branchChosen} Inventory` : 'Please select a branch'}
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
          </div>
        ) : branchChosen ? (
          filteredInventory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manufacturer
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.product_id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.product_id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.product_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.manufacturer || 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.qty >= 7 ? 'bg-green-100 text-green-800' :
                            item.qty >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {item.qty}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleSellClick(item)}
                          className='bg-black text-white px-5 py-2 text-xm rounded hover:bg-opacity-80 transition-all shadow'
                          disabled={item.qty <= 0}
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No inventory found for this branch</p>
            </div>
          )
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>Please select a branch to view inventory</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBranchInventory;