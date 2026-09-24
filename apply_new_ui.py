import os
import re

PAGE_DIR = "frontend/src/pages"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Update outer wrappers
    content = re.sub(r'className="p-4 md:p-6 space-y-6.*?"', 'className="w-full space-y-6"', content)
    content = re.sub(r'className="p-6 max-w-7xl mx-auto space-y-6"', 'className="w-full space-y-6"', content)
    content = re.sub(r'className="max-w-7xl mx-auto space-y-6.*?"', 'className="w-full space-y-6"', content)
    
    # Remove bg-white from the very top wrapper if any page has it (we want transparent so it shows layout bg)
    content = re.sub(r'<div className="w-full bg-white space-y-6">', '<div className="w-full space-y-6">', content)
    content = re.sub(r'<div className="p-4 md:p-6 space-y-6 bg-white">', '<div className="w-full space-y-6">', content)

    # Update card styles to the new aesthetic
    # e.g., Members, Visitor, Sales, etc.
    content = re.sub(r'bg-white rounded-lg shadow-sm border border-gray-200', 'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50', content)
    content = re.sub(r'bg-white rounded-xl shadow-sm border border-gray-100', 'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50', content)
    content = re.sub(r'bg-white shadow-sm border border-gray-200 rounded-lg', 'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50', content)

    # Update modal overlays to match
    content = re.sub(r'bg-white rounded-lg shadow-xl w-full max-w-.*? ', 'bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 w-full max-w-2xl ', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(PAGE_DIR):
    for file in files:
        if file.endswith('.tsx') and file != 'Home.tsx': # Home is already done
            process_file(os.path.join(root, file))

print("Done")
