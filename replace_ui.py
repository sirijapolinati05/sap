import os
import re

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                full_path = os.path.join(root, file)
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                before = content
                
                # Remove all shadow-[...]
                content = re.sub(r'shadow-\[[^\]]+\]', 'shadow-sm', content)
                content = re.sub(r'hover:shadow-\[[^\]]+\]', 'hover:shadow-md', content)
                content = re.sub(r'active:shadow-\[[^\]]+\]', 'active:shadow-inner', content)
                
                # Replace neumorphic backgrounds
                content = re.sub(r'bg-\[#f0f0f3\]', 'bg-white', content)
                content = re.sub(r'bg-\[#cbced1\]', 'bg-gray-200', content)
                
                if content != before:
                    with open(full_path, 'w', encoding='utf-8') as f:
                        f.write(content)

process_dir('frontend/src')
print('Done replacement')
