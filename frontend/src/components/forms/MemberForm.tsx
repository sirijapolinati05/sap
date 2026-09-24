import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

interface MemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded?: (member: any) => void;
  onMemberUpdated?: (member: any) => void;
  initialData?: any;
}

const MemberForm: React.FC<MemberFormProps> = ({ isOpen, onClose, onMemberAdded, onMemberUpdated, initialData }) => {
  const [contactInfoOpen, setContactInfoOpen] = useState(true);
  const [membershipOpen, setMembershipOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: 'Mr',
    first_name: '',
    last_name: '',
    dob: '',
    occupation: '',
    designation: '',
    organization: '',
    contact_number: '',
    isd_code: '+91',
    email: '',
    h_no: '',
    street: '',
    locality: '',
    city: '',
    pincode: '',
    country: 'India',
    state: 'Telangana',
    ref_member_no: '',
    relation_with_sas: '',
    preferred_language: '',
    paid_on: '',
    membership_amount: '',
    membership_category: '',
    joining_date: '',
    membership_ends_on: '',
    introduced_by: ''
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title || 'Mr',
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        dob: initialData.dob || '',
        occupation: initialData.occupation || '',
        designation: initialData.designation || '',
        organization: initialData.organization || '',
        contact_number: initialData.contact_number || '',
        isd_code: initialData.isd_code || '+91',
        email: initialData.email || '',
        h_no: initialData.h_no || '',
        street: initialData.street || '',
        locality: initialData.locality || '',
        city: initialData.city || '',
        pincode: initialData.pincode || '',
        country: initialData.country || 'India',
        state: initialData.state || 'Telangana',
        ref_member_no: initialData.ref_member_no || '',
        relation_with_sas: initialData.relation_with_sas || '',
        preferred_language: initialData.preferred_language || '',
        paid_on: initialData.paid_on || '',
        membership_amount: initialData.membership_amount !== null && initialData.membership_amount !== undefined ? initialData.membership_amount.toString() : '',
        membership_category: initialData.membership_category || '',
        joining_date: initialData.joining_date || '',
        membership_ends_on: initialData.membership_ends_on || '',
        introduced_by: initialData.introduced_by || ''
      });
    } else if (isOpen) {
      // Reset form if opening without initialData
      setFormData({
        title: 'Mr',
        first_name: '',
        last_name: '',
        dob: '',
        occupation: '',
        designation: '',
        organization: '',
        contact_number: '',
        isd_code: '+91',
        email: '',
        h_no: '',
        street: '',
        locality: '',
        city: '',
        pincode: '',
        country: 'India',
        state: 'Telangana',
        ref_member_no: '',
        relation_with_sas: '',
        preferred_language: '',
        paid_on: '',
        membership_amount: '',
        membership_category: '',
        joining_date: '',
        membership_ends_on: '',
        introduced_by: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData };
      
      const dateFields = ['dob', 'paid_on', 'joining_date', 'membership_ends_on'];
      for (const field of dateFields) {
        if (!payload[field as keyof typeof payload]) {
          (payload as any)[field] = null;
        }
      }
      
      if (payload.membership_amount === '') {
        (payload as any).membership_amount = null;
      } else if (payload.membership_amount !== null) {
        (payload as any).membership_amount = parseFloat(payload.membership_amount as string);
      }

      if (!payload.last_name || !payload.contact_number || !payload.pincode || !payload.membership_category || payload.membership_category === '--Choose--') {
        alert("Please fill all required fields");
        return;
      }

      const url = initialData 
        ? `${import.meta.env.VITE_API_URL}/members/${initialData.id}` 
        : `${import.meta.env.VITE_API_URL}/members`;
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resultMember = await response.json();
        if (initialData) {
          if (onMemberUpdated) onMemberUpdated(resultMember);
          alert("Updated successfully");
        } else {
          if (onMemberAdded) onMemberAdded(resultMember);
        }
        onClose();
      } else {
        console.error(initialData ? "Failed to update member" : "Failed to create member");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-gray-50 sm:rounded-xl shadow-sm border-0 sm:border border-gray-300 w-full h-full sm:h-auto max-w-4xl max-h-screen sm:max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Member' : 'Add Member'}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          <form className="space-y-8">
            
            {/* Name section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Title</label>
                <div className="flex bg-slate-50 shadow-sm border-t border-r border-b border-l-2 border-l-red-500 border-gray-400/60 rounded-md overflow-hidden">
                  <select name="title" value={formData.title} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none">
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1 relative md:col-span-2">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">First Name</label>
                <div className="flex bg-slate-50 shadow-sm border-t border-r border-b border-l-2 border-l-red-500 border-gray-400/60 rounded-md overflow-hidden">
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none" />
                </div>
              </div>
              
              <div className="space-y-1 relative md:col-span-2">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Last Name <span className="text-red-500">*</span></label>
                <div className="flex bg-slate-50 shadow-sm border-t border-r border-b border-l-2 border-l-red-500 border-gray-400/60 rounded-md overflow-hidden">
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none" />
                </div>
              </div>
            </div>

            {/* Additional Info section */}
            <div className="space-y-4">
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Date of Birth</label>
                <div className="flex bg-slate-50 shadow-sm border border-gray-400/60 rounded-md overflow-hidden">
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none text-slate-700 uppercase" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Member Occupation</label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
                </div>
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Member Designation</label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
                </div>
              </div>
              
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Organization</label>
                <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>
            </div>

            {/* Contact Info Header */}
            <button
              type="button"
              onClick={() => setContactInfoOpen(prev => !prev)}
              className="w-full bg-[#6b7c84] hover:bg-[#5a6b72] text-white px-4 py-2 text-sm font-medium rounded-sm flex items-center space-x-2 transition-colors"
            >
              <span className="text-base font-bold w-4 text-center">{contactInfoOpen ? '−' : '+'}</span>
              <span>Contact Info</span>
            </button>
            
            {contactInfoOpen && <div className="space-y-4 border border-gray-200 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">ISD Code</label>
                  <div className="flex bg-slate-50 shadow-sm border border-gray-400/60 rounded-md overflow-hidden">
                    <input type="text" name="isd_code" readOnly value={formData.isd_code} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none text-slate-700 font-medium cursor-default" />
                  </div>
                </div>
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Contact Number <span className="text-red-500">*</span></label>
                  <div className="flex bg-slate-50 shadow-sm border-t border-r border-b border-l-2 border-l-red-500 border-gray-400/60 rounded-md overflow-hidden">
                    <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>
              
              <div className="space-y-1 relative mt-4">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">H.No / Apt No. / Apt Block / Apt Name</label>
                <input type="text" name="h_no" value={formData.h_no} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>
              
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Street No. / Colony name / Landmark</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>

              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Locality</label>
                <input type="text" name="locality" value={formData.locality} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
                </div>
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Pincode <span className="text-red-500">*</span></label>
                  <div className="flex bg-slate-50 shadow-sm border-t border-r border-b border-l-2 border-l-red-500 border-gray-400/60 rounded-md overflow-hidden">
                    <input list="pincodes" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="--Search or Enter--" className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none" />
                    <datalist id="pincodes">
                      {Array.from({ length: 150 }, (_, i) => 500001 + i).map(pin => (
                        <option key={pin} value={pin} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none">
                    <option>India</option>
                  </select>
                </div>
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">State</label>
                  <select name="state" value={formData.state} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none">
                    <option>Telangana</option>
                  </select>
                </div>
              </div>
            </div>}

            {/* Membership Details Header */}
            <button
              type="button"
              onClick={() => setMembershipOpen(prev => !prev)}
              className="w-full bg-[#8b6088] hover:bg-[#7a5077] text-white px-4 py-2 text-sm font-medium rounded-sm flex items-center space-x-2 transition-colors"
            >
              <span className="text-base font-bold w-4 text-center">{membershipOpen ? '−' : '+'}</span>
              <span>Membership Details</span>
            </button>

            {membershipOpen && <div className="space-y-4 border border-gray-200 p-4 rounded-md">
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Ref Member No</label>
                <input type="text" name="ref_member_no" value={formData.ref_member_no} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Relation with SAS</label>
                <select name="relation_with_sas" value={formData.relation_with_sas} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none">
                  <option>--Select--</option>
                  <option>SAS MC Member</option>
                  <option>SAS Members</option>
                </select>
              </div>
              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Prefered Language</label>
                <select name="preferred_language" value={formData.preferred_language} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none">
                  <option>--Select--</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Odia</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Paid On</label>
                  <div className="flex bg-slate-50 shadow-sm border border-gray-400/60 rounded-md overflow-hidden">
                    <input type="date" name="paid_on" value={formData.paid_on} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none text-slate-700 uppercase" />
                  </div>
                </div>
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Membership Amount</label>
                  <input type="text" name="membership_amount" value={formData.membership_amount} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Membership Category <span className="text-red-500">*</span></label>
                <div className="flex bg-slate-50 shadow-sm border-t border-r border-b border-l-2 border-l-red-500 border-gray-400/60 rounded-md overflow-hidden">
                  <select name="membership_category" value={formData.membership_category} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none">
                    <option>--Choose--</option>
                    <option>Patron-99 Year</option>
                    <option>Lifetime Members-99 Year</option>
                    <option>Member with Magazine-5 Year</option>
                    <option>Member with Magazine-10 Year</option>
                    <option>Member with Magazine-1 Year</option>
                    <option>Institutional Member-1 Year</option>
                    <option>Corporate Member-10 Year</option>
                    <option>Member with Magazine-3 Year</option>
                    <option>Member without Magazine-3 Year</option>
                    <option>Member without Magazine-1 Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Joining/Renewal Date</label>
                  <div className="flex bg-slate-50 shadow-sm border border-gray-400/60 rounded-md overflow-hidden">
                    <input type="date" name="joining_date" value={formData.joining_date} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none text-slate-700 uppercase" />
                  </div>
                </div>
                <div className="space-y-1 relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Membership Ends on</label>
                  <div className="flex bg-slate-50 shadow-sm border border-gray-400/60 rounded-md overflow-hidden">
                    <input type="date" name="membership_ends_on" value={formData.membership_ends_on} onChange={handleChange} className="w-full bg-transparent border-none py-2 px-3 text-sm focus:ring-0 outline-none text-slate-700 uppercase" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 relative mt-4">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-slate-500 font-medium">Introduced By</label>
                <input type="text" name="introduced_by" value={formData.introduced_by} onChange={handleChange} className="w-full bg-slate-50 shadow-sm border border-gray-400/60 rounded-md py-2 px-3 text-sm focus:outline-none" />
              </div>
            </div>}

          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center p-5 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-gray-300 active:scale-95 active:shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm"
          >
            {initialData ? 'Update' : 'Create'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default MemberForm;
