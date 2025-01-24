import React, { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';

// Mock data - In a real app, this would come from an API
const initialInventory = [
  { name: 'Paracetamol', quantity: 15, brand: 'Pfizer', type: 'generic' },
  { name: 'Amoxicillin', quantity: 45, brand: 'Moderna', type: 'branded' },
  { name: 'Ibuprofen', quantity: 85, brand: 'Johnson & Johnson', type: 'generic' },
  { name: 'Aspirin', quantity: 25, brand: 'Pfizer', type: 'generic' },
  { name: 'Cetirizine', quantity: 95, brand: 'Moderna', type: 'branded' },
];

export default function Inventory() {
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [quantityFilter, setQuantityFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  
  // Memoized filtered data
  const filteredInventory = useMemo(() => {
    return initialInventory.filter(drug => {
      // Search filter
      const searchMatch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drug.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Quantity filter
      const quantityMatch = !quantityFilter || drug.quantity < parseInt(quantityFilter);
      
      // Brand filter
      const brandMatch = !brandFilter || drug.brand.toLowerCase() === brandFilter.toLowerCase();
      
      return searchMatch && quantityMatch && brandMatch;
    });
  }, [searchQuery, quantityFilter, brandFilter]);

  const getButtonColor = (quantity) => {
    if (quantity < 20) return 'bg-red-600 hover:bg-red-700';
    if (quantity < 80) return 'bg-yellow-600 hover:bg-yellow-700';
    return 'bg-green-600 hover:bg-green-700';
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Your Inventory</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Drug Name or Brand Name"
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select 
            value={quantityFilter}
            onChange={(e) => setQuantityFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Filter by Quantity</option>
            <option value="20">Less than 20</option>
            <option value="80">Less than 80</option>
            <option value="100">Less than 100</option>
          </select>
          <select 
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Filter by Brand</option>
            <option value="pfizer">Pfizer</option>
            <option value="moderna">Moderna</option>
            <option value="johnson & johnson">Johnson & Johnson</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Drug Name</th>
                <th className="text-left py-4 px-4">Quantity</th>
                <th className="text-left py-4 px-4">Brand Name</th>
                <th className="text-left py-4 px-4">Type</th>
                <th className="text-left py-4 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredInventory.map((drug, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{drug.name}</td>
                  <td className="py-4 px-4">{drug.quantity}</td>
                  <td className="py-4 px-4">{drug.brand}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      drug.type === 'generic'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {drug.type === 'generic' ? 'Generic' : 'Branded'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => {
                        setSelectedDrug(drug);
                        setShowRefillModal(true);
                      }}
                      className={`text-white px-4 py-2 rounded-lg transition-colors ${getButtonColor(drug.quantity)}`}
                    >
                      Refill Today
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No matching items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refill Modal */}
      {showRefillModal && selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{selectedDrug.name}</h2>
                <button
                  onClick={() => setShowRefillModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refill Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="pfizer">Pfizer</option>
                    <option value="moderna">Moderna</option>
                    <option value="jj">Johnson & Johnson</option>
                    <option value="eli">Eli Lilly</option>
                    <option value="merck">Merck</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    alert('Your Refill is Confirmed');
                    setShowRefillModal(false);
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Refill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}