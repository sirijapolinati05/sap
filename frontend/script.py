import os
import re

files = [
    'c:/Users/pavan/Downloads/Branch Manage/frontend/src/components/forms/CashBookForm.tsx',
    'c:/Users/pavan/Downloads/Branch Manage/frontend/src/components/forms/InventoryForm.tsx',
    'c:/Users/pavan/Downloads/Branch Manage/frontend/src/components/forms/SalesForm.tsx',
    'c:/Users/pavan/Downloads/Branch Manage/frontend/src/components/forms/VendorForm.tsx'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # 1. Update modal container
    content = re.sub(
        r'bg-white rounded-lg shadow-xl',
        r'bg-gray-50 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-300',
        content
    )
    content = re.sub(
        r'bg-white rounded-lg shadow-2xl',
        r'bg-gray-50 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-300',
        content
    )

    # 2. Update shadow-inner to 3D inset
    content = content.replace(
        'shadow-inner',
        'shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] border border-gray-400/60'
    )
    
    # Clean duplicate borders
    content = re.sub(r'border border-gray-300\s*(.*?)border border-gray-400/60', r'border border-gray-400/60 \1', content)

    # 3. Buttons Cancel
    content = re.sub(
        r'bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded text-sm font-medium transition-colors border border-gray-200',
        r'bg-gray-200 hover:bg-gray-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]',
        content
    )
    content = re.sub(
        r'bg-gray-200 hover:bg-gray-300 text-slate-700 px-5 py-2 rounded-md font-medium text-sm transition-colors',
        r'bg-gray-200 hover:bg-gray-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]',
        content
    )

    # 4. Buttons Save/Create
    content = re.sub(
        r'bg-\[\#2a2a2a\] hover:bg-black text-white px-6 py-2 rounded text-sm font-medium transition-colors',
        r'bg-[#2a2a2a] hover:bg-black text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_4px_6px_rgba(0,0,0,0.3)] border border-black active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]',
        content
    )
    content = re.sub(
        r'bg-\[\#2a2a2a\] hover:bg-black text-white px-6 py-2 rounded-md shadow-sm font-medium text-sm transition-colors',
        r'bg-[#2a2a2a] hover:bg-black text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_4px_6px_rgba(0,0,0,0.3)] border border-black active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]',
        content
    )

    with open(file, 'w') as f:
        f.write(content)

print("Done")
