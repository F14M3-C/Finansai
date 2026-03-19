import { Router, type Request, type Response } from 'express';
import { prisma } from '../../lib/prisma';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, amount, type, description, accountId } = req.body;

        if (!title || !amount || !type || !accountId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Sukurti naują transakciją DB per Prisma
        const newTransaction = await prisma.transaction.create({
            data: {
                title,
                amount: parseFloat(amount),
                type: type, // "INCOME" l "EXPENSE" turi atitikti Enum'ą
                description: description || null,
                accountId: parseInt(accountId)
            }
        });

        // Grąžinti pavykusią transakciją
        res.status(201).json({
            message: 'Operacija sėkmingai pridėta',
            data: newTransaction
        });

    } catch (error) { 
        console.error('Error pridedant transakciją:', error);
        res.status(500).json({ error: 'Įvyko klaida pridedant operaciją' });
    }
});

// Gauti konkrečios paskyros (account) transakcijas
router.get('/:accountId', async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const transactions = await prisma.transaction.findMany({
            where: {
                accountId: parseInt(accountId)
            }
        });
        res.json({ data: transactions });
    } catch (error) {
        console.error('Error gaunant transakcijas:', error);
        res.status(500).json({ error: 'Įvyko klaida gaunant operacijas' });
    }
});

export default router;