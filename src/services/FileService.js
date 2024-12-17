const fs = require('fs').promises;

class FileService {
    static async readFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data || '[]');
        } catch (error) {
            return [];
        }
    }

    static async writeFile(filePath, data) {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = FileService;