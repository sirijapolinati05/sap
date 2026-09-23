import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface MemberDetailsProps {
  member: any;
  onBack: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onBack }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase() || 'M';
  };

  const address1 = [member.h_no, member.street].filter(Boolean).join(', ') || 'N/A';
  const address2 = member.locality || 'N/A';
  const address3 = 'N/A'; // Assuming we don't have this in schema

  return (
    <div className="p-4 md:p-6 space-y-6 relative animate-in fade-in duration-300">
      <div className="flex items-center space-x-2 mb-2">
        <button onClick={onBack} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Member Details</h1>
      </div>

      {/* Header Banner */}
      <div className="bg-[#2c2957] rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 text-white shadow-sm">
        <div className="w-20 h-20 rounded-full border border-[#524e93] bg-[#3f3b7d] flex items-center justify-center text-xl font-medium shrink-0">
          {getInitials(member.first_name, member.last_name)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:space-x-3 space-y-2 md:space-y-0">
            <h2 className="text-2xl font-semibold">{member.title ? `${member.title} ` : ''}{member.first_name ? `${member.first_name} ` : ''}{member.last_name}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/30 text-emerald-400 text-xs font-medium border border-emerald-500/50">
              Active
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start text-[#a3a0c7] text-sm mt-3 gap-y-1 gap-x-2">
            <span>{member.ref_member_no || `M-${member.id || 'N/A'}`}</span>
            <span className="text-[#524e93]">•</span>
            <span>{member.membership_category || 'N/A'}</span>
            <span className="text-[#524e93]">•</span>
            <span>Since {member.joining_date || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#9ba1b4] rounded flex overflow-x-auto text-sm font-medium hide-scrollbar">
        {['Show All', 'Personal Details', 'Current Membership', 'Sale/Purchase History', 'Visiting History'].map((tab, idx) => (
          <button 
            key={idx}
            className={`px-6 py-3 whitespace-nowrap transition-colors relative ${idx === 0 ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'}`}
          >
            {tab}
            {idx === 0 && (
              <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#4f46e5] rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Address Details */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-slate-800">Address Details</h3>
            </div>
            <div className="p-4 space-y-2">
              <DetailRow label="Address 1" value={address1} />
              <DetailRow label="Address 2" value={address2} />
              <DetailRow label="Address 3" value={address3} />
              <DetailRow label="City" value={member.city} />
              <DetailRow label="Pincode" value={member.pincode} />
              <DetailRow label="State" value={member.state} />
              <DetailRow label="Country" value={member.country} />
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-fit">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-slate-800">Contact Details</h3>
            </div>
            <div className="p-4 space-y-2">
              <DetailRow label="ISD Code" value={member.isd_code?.replace('+', '')} />
              <DetailRow label="Contact Number" value={member.contact_number} />
              <DetailRow label="Email" value={member.email} />
            </div>
          </div>
        </div>

        {/* Current Membership */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-slate-800">Current Membership</h3>
          </div>
          <div className="p-4 space-y-2">
            <DetailRow label="Ref Member No" value={member.ref_member_no} />
            <DetailRow label="Occupation" value={member.occupation} />
            <DetailRow label="Designation" value={member.designation} />
            <DetailRow label="Organization" value={member.organization} />
            <DetailRow label="Category" value={member.membership_category} />
            <DetailRow label="Paid Amount" value={member.membership_amount} />
            <DetailRow label="Paid On" value={member.paid_on} />
            <DetailRow label="Introduced By" value={member.introduced_by} />
            <DetailRow label="Relation with SAS" value={member.relation_with_sas} />
          </div>
        </div>

        {/* History placeholders */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-slate-800">Sale/Purchase History</h3>
          </div>
          <div className="p-8 text-center text-slate-500 text-sm">
            No sale or purchase history available.
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-slate-800">Visiting History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-slate-600 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium">Visit Date</th>
                  <th className="px-4 py-3 font-medium">Visit Day</th>
                  <th className="px-4 py-3 font-medium">Entry By</th>
                  <th className="px-4 py-3 font-medium">Exit By</th>
                  <th className="px-4 py-3 font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No visiting history available.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string, value: any }) => (
  <div className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-4 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
    <div className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm font-medium">{label}</div>
    <div className="sm:col-span-2 text-slate-800 text-sm">{value || 'N/A'}</div>
  </div>
);

export default MemberDetails;
