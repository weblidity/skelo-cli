const fs = require('fs');
const path = require('path');

function buildTreeMarkdown(dir, basePath, prefix = '', exclude = ['node_modules', '.git', 'coverage']) {
    let treeContent = '';
    const items = fs.readdirSync(dir);

    const relativePath = path.relative(basePath, dir);
    if (relativePath === '') {
        treeContent += 'skelo-cli\n';
    }

    items
        .filter(item => !exclude.includes(item))
        .sort((a, b) => {
            const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
            const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
            if (aIsDir === bIsDir) return a.localeCompare(b);
            return bIsDir ? 1 : -1;
        })
        .forEach((item, index, array) => {
            const fullPath = path.join(dir, item);
            const isLast = index === array.length - 1;
            const stat = fs.statSync(fullPath);
            
            const branch = isLast ? '└── ' : '├── ';
            const subBranchPrefix = isLast ? '    ' : '│   ';
            
            treeContent += `${prefix}${branch}${item}\n`;

            if (stat.isDirectory()) {
                treeContent += buildTreeMarkdown(
                    fullPath,
                    basePath,
                    prefix + subBranchPrefix,
                    exclude
                );
            }
        });

    return treeContent;
}

function updateReadme() {
    const rootDir = path.join(__dirname, '../..');
    const readmePath = path.join(rootDir, 'README.md');
    
    const tree = buildTreeMarkdown(rootDir, rootDir);
    
    let readme = fs.readFileSync(readmePath, 'utf8');

    const updatedSection = [
        '<!-- File Structure Begin -->',
        '```plaintext',
        tree.trim(),
        '```',
        '<!-- File Structure End -->'
    ].join('\n');

    readme = readme.replace(
        /<!-- File Structure Begin -->[\s\S]*?<!-- File Structure End -->/,
        updatedSection
    );

    fs.writeFileSync(readmePath, readme);
    console.log('✔ README.md file structure updated successfully!');
}

updateReadme();