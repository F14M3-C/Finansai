import { Router, type Request, type Response } from 'express';

const router = Router();

// pvz pridejimo

type TransactionType = "INCOME" | "EXPENSE";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: TransactionType;
    description: string | null;
    accountId: number;
    createdAt: Date;
}

let transactions: Transaction[] = [];
let nextId = 1;

router.post('/', (req: Request, res: Response) => {
    try {
        const { title, amount, type, description, accountId } = req.body;

        if (!title || !amount || !type || !accountId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        //sukurti nauja transakcija

        const newTransaction: Transaction = {
            id: nextId++,
            title,
            amount: parseFloat(amount),
            type: type as TransactionType,
            description: description || null,
            accountId: parseInt(accountId),
            createdAt: new Date()
        };

        transactions.push(newTransaction);

        // grazinti pavykusia transakcija

        res.status(201).json({
            message: 'Operacija sėkmingai pridėta',
            data: newTransaction
        });

    } catch (error) { 
        console.error('Error pridedant transakciją:', error);
        res.status(500).json({ error: 'Įvyko klaida pridedant operaciją' });
    }
});
// gauti visas transakcijas
router.get('/', (req: Request, res: Response) => {
    res.json({ data: transactions });
});

export default router;