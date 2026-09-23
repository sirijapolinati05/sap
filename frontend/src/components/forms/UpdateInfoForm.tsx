import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface UpdateInfoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateInfoForm: React.FC<UpdateInfoFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sas_company_id: 'Sri Aurobindo Society',
    location_code: 'SAAHYD',
    add1: 'Sri Aurobindo bhavan 1-6-1055',
    add2: 'Musheerabad X Roads',
    add3: 'Hyderabad',
    city: '',
    zip_code: '500020',
    gst_reg_type: '1',
    gst_no: '36AACTS1964M1Z0',
    tin_no: '',
    vat_no: '',
    phone_no: '',
    fax_no: '',
    address_type: '',
    contact_1_name: '',
    contact_1_dept: '',
    contact_1_design: '',
    contact_1_contact_no: '',
    contact_1_email: '',
    contact_2_name: '',
    contact_2_dept: '',
    contact_2_design: '',
    contact_2_contact_no: '',
    contact_2_email: '',
    country: 'India',
    state: 'Telangana'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyChanges = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save location data');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(2px)' }}>
      <div className="w-[550px] max-h-[90vh] bg-[#f9fbfd] rounded-md shadow-2xl flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h2 className="text-lg font-bold text-slate-800">Add/Edit Company Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 border border-dashed border-gray-300 rounded" disabled={loading}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Sas Company Id</label>
            <div className="flex items-center px-2 pb-1">
              <select 
                name="sas_company_id" 
                value={formData.sas_company_id} 
                onChange={handleChange} 
                className="w-full text-sm outline-none bg-transparent appearance-none"
              >
                <option value="Sri Aurobindo Society">Sri Aurobindo Society</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-400 -mt-3 pr-1">Required</div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm border-dashed border-red-300">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Location Code</label>
            <input name="location_code" value={formData.location_code} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-0.5 h-full bg-red-500"></div>
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Add1</label>
            <input name="add1" value={formData.add1} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>
          <div className="text-right text-[10px] text-gray-400 -mt-3 pr-1">Required</div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Add2</label>
            <input name="add2" value={formData.add2} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Add3</label>
            <input name="add3" value={formData.add3} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City" className="w-full text-sm outline-none bg-transparent px-2 py-1" />
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Zip Code</label>
            <input name="zip_code" value={formData.zip_code} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Gst Reg Type</label>
            <input name="gst_reg_type" value={formData.gst_reg_type} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Gst No</label>
            <input name="gst_no" value={formData.gst_no} onChange={handleChange} type="text" className="w-full text-sm outline-none bg-transparent px-2 pb-1" />
          </div>

          {[
            {label: 'Tin No', name: 'tin_no'}, 
            {label: 'Vat No', name: 'vat_no'}, 
            {label: 'Phone No', name: 'phone_no'}, 
            {label: 'Fax No', name: 'fax_no'}, 
            {label: 'Address Type', name: 'address_type'}, 
            {label: 'Contact 1 Name', name: 'contact_1_name'}, 
            {label: 'Contact 1 Dept', name: 'contact_1_dept'}, 
            {label: 'Contact 1 Design', name: 'contact_1_design'}, 
            {label: 'Contact 1 Contact No', name: 'contact_1_contact_no'}, 
            {label: 'Contact 1 Email', name: 'contact_1_email'}, 
            {label: 'Contact 2 Name', name: 'contact_2_name'}, 
            {label: 'Contact 2 Dept', name: 'contact_2_dept'}, 
            {label: 'Contact 2 Design', name: 'contact_2_design'}, 
            {label: 'Contact 2 Contact No', name: 'contact_2_contact_no'}, 
            {label: 'Contact 2 Email', name: 'contact_2_email'}
          ].map((field, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded p-1 shadow-sm">
              <input 
                type="text" 
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                placeholder={field.label} 
                className="w-full text-sm outline-none bg-transparent px-2 py-1" 
              />
            </div>
          ))}

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">Country</label>
            <div className="flex items-center px-2 pb-1">
              <select name="country" value={formData.country} onChange={handleChange} className="w-full text-sm outline-none bg-transparent appearance-none">
                <option value="India">India</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-1 shadow-sm">
            <label className="block text-[10px] text-gray-500 px-2 pt-1">State</label>
            <div className="flex items-center px-2 pb-1">
              <select name="state" value={formData.state} onChange={handleChange} className="w-full text-sm outline-none bg-transparent appearance-none">
                <option value="Telangana">Telangana</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

        </div>

        {error && <div className="px-4 py-2 text-sm text-red-500 bg-red-50 border-t border-red-100">{error}</div>}
        {success && <div className="px-4 py-2 text-sm text-green-500 bg-green-50 border-t border-green-100">Location updated successfully!</div>}

        <div className="p-4 bg-[#f9fbfd] border-t border-gray-200 flex justify-between">
          <div className="space-x-2">
            <button onClick={onClose} disabled={loading} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 disabled:opacity-50">Cancel</button>
            <button disabled={loading} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 disabled:opacity-50">Delete</button>
          </div>
          <button 
            onClick={handleApplyChanges}
            disabled={loading}
            className="px-4 py-2 bg-[#2d2d2d] text-white text-sm font-medium rounded shadow-sm hover:bg-black disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? 'Saving...' : 'Apply Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfoForm;
