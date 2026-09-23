import os
import re

TARGET_CLASS = 'bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]'

directories = ['frontend/src/pages', 'frontend/src/components', 'frontend/src/components/forms']

patterns_to_replace = [
    r'className=\"bg-\[#[a-zA-Z0-9]+\] hover:bg-\[#[a-zA-Z0-9]+\] text-white px-[0-9.]+ py-[0-9.]+ rounded(?:-[a-zA-Z]+)? text-sm font-medium[^\"]*\"',
    r'className=\"bg-\[#[a-zA-Z0-9]+\] text-white font-medium text-sm px-[0-9.]+ py-[0-9.]+ rounded hover:bg-\[#[a-zA-Z0-9]+\][^\"]*\"',
    r'className=\"bg-\[#[a-zA-Z0-9]+\] hover:bg-black text-white px-[0-9.]+ py-[0-9.]+ rounded(?:-[a-zA-Z]+)?[^\"]*\"'
]

# Additional pattern for the SystemSetup ones, which might be slightly different
patterns_to_replace.append(r'className=\"bg-\[#[a-zA-Z0-9]+\] hover:bg-\[#[a-zA-Z0-9]+\] text-white[^\"]*px-[0-9.]+ py-[0-9.]+[^\"]*\"')


for d in directories:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.tsx'):
                filepath = os.path.join(root, f)
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                original_content = content
                for pattern in patterns_to_replace:
                    content = re.sub(pattern, f'className=\"{TARGET_CLASS}\"', content)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f'Updated {filepath}')

