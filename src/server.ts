import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;
const DB_FILE = 'db.json';

app.use(bodyParser.json());

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

app.get('/ping', (req: Request, res: Response) => {
    res.json(true);
});

app.post('/submit', (req: Request, res: Response) => {
    const submission = req.body;
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    db.push(submission);
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    res.status(201).send('Submission saved.');
});

app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    if (index >= 0 && index < db.length) {
        res.json(db[index]);
    } else {
        res.status(404).send('Submission not found.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
