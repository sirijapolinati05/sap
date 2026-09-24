import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newCategory: any) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'Product',
    parent: '',
    code: '',
    name: '',
    hsn: '',
    vendor: '',
    tax: '',
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
        onClose();
        setFormData({
          type: 'Product', parent: '', code: '', name: '',
          hsn: '', vendor: '', tax: '', status: 'Active'
        });
      } else {
        console.error('Failed to create category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-800">Add New Category</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm">
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Parent Category</label>
              <input type="text" name="parent" value={formData.parent} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category Code</label>
              <input type="text" name="code" value={formData.code} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm" placeholder="e.g. CAT-01" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm" placeholder="Name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">HSN/SAC Code</label>
              <input type="text" name="hsn" value={formData.hsn} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Vendor</label>
              <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Default Tax</label>
              <input type="text" name="tax" value={formData.tax} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm" placeholder="e.g. GST 18%" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-sm">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-4 mt-6 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 mr-2 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#5a6c8e] text-white rounded-md text-sm font-semibold hover:bg-[#4a5a75]">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
