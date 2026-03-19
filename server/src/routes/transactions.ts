import { Router } from "express";

import * as TransactionsController from "../controllers/transactions";

const transactionsRouter = Router();

transactionsRouter.post("/", TransactionsController.createTransaction);
transactionsRouter.get("/:accountId", TransactionsController.getTransactions);

export default transactionsRouter;
