import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Minus } from 'lucide-react';

interface InventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ isOpen, onClose }) => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagsRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    category: '',
    item_name: '',
    description: '',
    item_code: '',
    hsn_sac: '',
    reorder_quantity: '',
    uom: '',
    purchase_price: '',
    mrp: '',
    sales_price: '',
    tax: '',
    status: true
  });

  const [itemImage, setItemImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const tagsList = ['Books', 'Yoga books', 'Essays'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItemImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Fetch categories
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories', err));

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        group_name: 'Default Group',
        sub_group: 'Default Sub Group',
        item_type: 'Product',
        item_category: formData.category || 'Uncategorized',
        item_code: formData.item_code || 'ITM-000',
        item_name: formData.item_name || 'New Item',
        description: formData.description,
        hsn_code: formData.hsn_sac,
        measure_unit: formData.uom || 'Nos',
        reorder_level: formData.reorder_quantity ? parseFloat(formData.reorder_quantity) : null,
        opening_rate: formData.mrp ? parseFloat(formData.mrp) : null
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        onClose();
        // ideally refresh the parent, we can just reload the page for now
        window.location.reload();
      } else {
        console.error('Failed to create item');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 w-full max-w-4xl flex flex-col h-[650px] max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-800">Add/Edit Items</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6 max-w-4xl">
            
            {/* Category */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-sm ">
                <option value="">Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            
            {/* Item Name/Title */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
              <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} placeholder="Item Name/Title" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
            </div>
            
            {/* Item Description/Subtitle */}
            <div className="relative">
              <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Item Description/Subtitle" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item Code */}
              <div className="relative">
                <input type="text" name="item_code" value={formData.item_code} onChange={handleChange} placeholder="Item Code" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
              </div>
              
              {/* HSN/SAC */}
              <div className="relative">
                <input type="text" name="hsn_sac" value={formData.hsn_sac} onChange={handleChange} placeholder="HSN/SAC" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
              </div>
              
              {/* Reorder Quantity */}
              <div className="relative">
                <input type="text" name="reorder_quantity" value={formData.reorder_quantity} onChange={handleChange} placeholder="Reorder Quantity" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
              </div>
              
              {/* Tags */}
              <div className="relative" ref={tagsRef}>
                <div 
                  className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer min-h-[46px] flex items-center"
                  onClick={() => setIsTagsOpen(!isTagsOpen)}
                >
                  <span className={selectedTags.length > 0 ? "text-slate-800" : "text-gray-500"}>
                    {selectedTags.length > 0 ? selectedTags.join(', ') : 'Tags'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
                
                {isTagsOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="p-2 space-y-1">
                      {tagsList.map(tag => (
                        <label 
                          key={tag}
                          className="flex items-center px-2 py-2 hover:bg-gray-50 cursor-pointer rounded"
                        >
                          <input 
                            type="checkbox" 
                            className="mr-3 h-4 w-4 rounded border-gray-300 text-[#3a8697] focus:ring-[#3a8697]"
                            checked={selectedTags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                          />
                          <span className="text-sm text-gray-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Status Toggle */}
            <div>
              <label className="text-[11px] text-gray-500 font-medium block mb-1">Status</label>
              <div 
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${formData.status ? 'bg-[#3a8697]' : 'bg-gray-300'}`}
                onClick={() => setFormData(prev => ({ ...prev, status: !prev.status }))}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.status ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>

            {/* Pricing Info Section */}
            <div className="pt-2">
              <div className="flex items-center space-x-2 font-semibold text-slate-800 mb-4">
                <Minus className="w-4 h-4" />
                <span>Pricing Info</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:pl-6">
                {/* UoM */}
                <div className="relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">UoM</label>
                  <select name="uom" value={formData.uom} onChange={handleChange} className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-sm ">
                    <option>--Select--</option>
                    <option value="Nos">Nos</option>
                    <option value="Pieces">Pieces</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
                
                {/* Purchase Price */}
                <div className="relative">
                  <input type="text" name="purchase_price" value={formData.purchase_price} onChange={handleChange} placeholder="Purchase Price" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
                </div>
                
                {/* MRP */}
                <div className="relative">
                  <input type="text" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
                </div>
                
                {/* Sales Price */}
                <div className="relative">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                  <input type="text" name="sales_price" value={formData.sales_price} onChange={handleChange} placeholder="Sales Price" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
                </div>
                
                {/* Tax */}
                <div className="relative md:col-span-2 mt-2">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">Tax</label>
                  <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-sm ">
                    <option>--Select--</option>
                    <option value="18% GST">18% GST</option>
                    <option value="0% GST">0% GST</option>
                    <option value="9% GST">9% GST</option>
                    <option value="5% GST">5% GST</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Item Image Section */}
            <div className="pt-2">
              <label className="text-[11px] text-gray-500 font-medium block mb-1">Item Image</label>
              <div className="border border-dashed border-gray-300 rounded-md p-3 flex items-center bg-white shadow-sm border border-gray-400/60">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white border border-gray-200 px-3 py-1.5 text-sm rounded shadow-sm cursor-pointer hover:bg-gray-50 transition-colors text-slate-700 whitespace-nowrap"
                >
                  Choose File
                </button>
                <span className="ml-3 text-sm text-gray-500 truncate">
                  {itemImage ? itemImage.name : 'No file chosen'}
                </span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between rounded-b-lg mt-auto">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-slate-700 font-bold text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-[#2a2a2a] text-white font-bold text-sm rounded hover:bg-black transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
