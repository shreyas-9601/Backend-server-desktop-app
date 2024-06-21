"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
const DB_FILE = 'db.json';
app.use(body_parser_1.default.json());
if (!fs_1.default.existsSync(DB_FILE)) {
    fs_1.default.writeFileSync(DB_FILE, JSON.stringify([]));
}
app.get('/ping', (req, res) => {
    res.json(true);
});
app.post('/submit', (req, res) => {
    const submission = req.body;
    const db = JSON.parse(fs_1.default.readFileSync(DB_FILE, 'utf8'));
    db.push(submission);
    fs_1.default.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    res.status(201).send('Submission saved.');
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    const db = JSON.parse(fs_1.default.readFileSync(DB_FILE, 'utf8'));
    if (index >= 0 && index < db.length) {
        res.json(db[index]);
    }
    else {
        res.status(404).send('Submission not found.');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
