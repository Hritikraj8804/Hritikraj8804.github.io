// This script reads all .md files from /public/projects/ and generates a JSON file
// Run with: npx tsx scripts/generate-projects.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDir = path.join(process.cwd(), 'public', 'projects');
const outputPath = path.join(process.cwd(), 'public', 'projects.json');

// Simple TOML parser for frontmatter (handles basic key = "value" format)
function parseToml(content: string): Record<string, any> {
    const result: Record<string, any> = {};
    // Normalize line endings and split
    const lines = content.replace(/\r/g, '').split('\n');

    for (const line of lines) {
        const match = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (match) {
            const key = match[1];
            let value = match[2].trim();

            // Parse string values (remove quotes)
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
                result[key] = value;
            }
            // Parse arrays
            else if (value.startsWith('[') && value.endsWith(']')) {
                try {
                    result[key] = JSON.parse(value.replace(/'/g, '"'));
                } catch {
                    result[key] = [];
                }
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

function generateProjectsJson() {
    // Check if directory exists
    if (!fs.existsSync(projectsDir)) {
        console.log('No projects directory found, creating empty projects.json');
        fs.writeFileSync(outputPath, JSON.stringify({ projects: [] }, null, 2));
        return;
    }

    // Read all .md files
    const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));

    const projects = files.map(filename => {
        const filePath = path.join(projectsDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Extract slug from filename
        const slug = filename.replace('.md', '');

        // Parse frontmatter - check for TOML (+++) or YAML (---)
        let data: Record<string, any> = {};

        // Try TOML frontmatter first (handle both \n and \r\n)
        const tomlMatch = fileContent.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+/);
        if (tomlMatch) {
            data = parseToml(tomlMatch[1]);
        } else {
            // Fall back to YAML with gray-matter
            const parsed = matter(fileContent);
            data = parsed.data;
        }

        // Parse date
        let year = new Date().getFullYear();
        let month = 'Jan';

        if (data.date) {
            const date = new Date(data.date);
            year = date.getFullYear();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            month = months[date.getMonth()];
        }

        return {
            title: data.title || slug,
            description: data.description || data.summary || '',
            tags: data.tags || [],
            link: data.link || '',
            source: data.source || data.github || `https://github.com/Hritikraj8804/${slug}`,
            year,
            month,
            status: data.status || null,
            slug,
        };
    });

    // Sort by date (newest first)
    projects.sort((a, b) => {
        const monthOrder: Record<string, number> = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        if (b.year !== a.year) return b.year - a.year;
        return monthOrder[b.month] - monthOrder[a.month];
    });

    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify({ projects }, null, 2));
    console.log(`Generated projects.json with ${projects.length} projects`);
}

generateProjectsJson();
