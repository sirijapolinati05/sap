const fs = require('fs');
const path = require('path');

const TARGET_CLASS = 'bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]';

const directories = ['frontend/src/pages', 'frontend/src/components', 'frontend/src/components/forms'];

const patternsToReplace = [
    /className=\"bg-\[#[a-zA-Z0-9]+\] hover:bg-\[#[a-zA-Z0-9]+\] text-white px-[0-9.]+ py-[0-9.]+ rounded(?:-[a-zA-Z]+)? text-sm font-medium[^\"]*\"/g,
    /className=\"bg-\[#[a-zA-Z0-9]+\] text-white font-medium text-sm px-[0-9.]+ py-[0-9.]+ rounded hover:bg-\[#[a-zA-Z0-9]+\][^\"]*\"/g,
    /className=\"bg-\[#[a-zA-Z0-9]+\] hover:bg-black text-white px-[0-9.]+ py-[0-9.]+ rounded(?:-[a-zA-Z]+)?[^\"]*\"/g,
    /className=\"bg-\[#[a-zA-Z0-9]+\] hover:bg-\[#[a-zA-Z0-9]+\] text-white[^\"]*px-[0-9.]+ py-[0-9.]+[^\"]*\"/g
];

function walkDir(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

directories.forEach(dir => {
    const files = walkDir(dir);
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        patternsToReplace.forEach(pattern => {
            content = content.replace(pattern, className="");
        });
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(Updated );
        }
    });
});
