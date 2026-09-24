import os
import re

PAGE_DIR = "frontend/src/pages"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Generic replacements to make wrappers fluid
    content = re.sub(r'className="([^"]*)max-w-7xl([^"]*)"', lambda m: 'className="' + m.group(1) + m.group(2).strip() + '"', content)
    content = re.sub(r'className="([^"]*)mx-auto([^"]*)"', lambda m: 'className="' + m.group(1) + m.group(2).strip() + '"', content)
    content = re.sub(r'className="([^"]*)\bp-4\b([^"]*)"', lambda m: 'className="' + m.group(1) + m.group(2).strip() + '"', content)
    content = re.sub(r'className="([^"]*)\bp-6\b([^"]*)"', lambda m: 'className="' + m.group(1) + m.group(2).strip() + '"', content)
    content = re.sub(r'className="([^"]*)\bmd:p-6\b([^"]*)"', lambda m: 'className="' + m.group(1) + m.group(2).strip() + '"', content)

    # Some cards are `bg-white shadow-sm rounded-lg` or similar
    content = re.sub(r'bg-white shadow-sm rounded-lg', 'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50', content)
    content = re.sub(r'bg-white rounded-lg shadow-sm', 'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50', content)
    content = re.sub(r'bg-white rounded-lg border border-gray-200', 'bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50', content)
    
    # Ensure they have w-full if they had space-y-6 as top wrapper
    content = re.sub(r'<div className="([^"]*?)(?<!w-full )space-y-6', r'<div className="\1w-full space-y-6', content)

    if content != original:
        # Clean up any double spaces in class names created by the regex
        content = re.sub(r'className="([^"]+)"', lambda m: 'className="' + " ".join(m.group(1).split()) + '"', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(PAGE_DIR):
    for file in files:
        if file.endswith('.tsx') and file != 'Home.tsx': # Home is already done
            process_file(os.path.join(root, file))

print("Done")
