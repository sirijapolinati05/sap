const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.match(/\.(tsx|ts|jsx|js)$/)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const before = content;
      
      // Remove all shadow-[...]
      content = content.replace(/shadow-\[[^\]]+\]/g, 'shadow-sm');
      content = content.replace(/hover:shadow-\[[^\]]+\]/g, 'hover:shadow-md');
      content = content.replace(/active:shadow-\[[^\]]+\]/g, 'active:shadow-inner');
      
      // Replace neumorphic backgrounds
      content = content.replace(/bg-\[#f0f0f3\]/g, 'bg-white');
      content = content.replace(/bg-\[#cbced1\]/g, 'bg-gray-200');
      
      if (content !== before) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir('frontend/src');
console.log('Done replacement');
