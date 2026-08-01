const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
            filelist.push(filepath);
        }
    }
    return filelist;
};

const files = walkSync('/Users/sudarshan/Documents/GitHub/ExpenseTracker-1/frontend/frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const regex1 = /(?<!dark:)bg-\[#151a23\]/g;
    if (regex1.test(content)) {
        content = content.replace(regex1, 'bg-blue-50 dark:bg-[#151a23]');
        changed = true;
    }

    const regex2 = /(?<!dark:)bg-\[#1a1f2e\]/g;
    if (regex2.test(content)) {
        content = content.replace(regex2, 'bg-blue-50 dark:bg-[#1a1f2e]');
        changed = true;
    }

    const regex3 = /(?<!dark:)bg-\[#0b0e14\]/g;
    if (regex3.test(content)) {
        content = content.replace(regex3, 'bg-blue-50 dark:bg-[#0b0e14]');
        changed = true;
    }

    const regex5 = /(?<!dark:)border-gray-800/g;
    if (regex5.test(content)) {
        content = content.replace(regex5, 'border-blue-100 dark:border-gray-800');
        changed = true;
    }
    
    const regex6 = /(?<!dark:)border-gray-700/g;
    if (regex6.test(content)) {
        content = content.replace(regex6, 'border-blue-200 dark:border-gray-700');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
