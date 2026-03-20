import { type Request, type Response } from "express";
import { body, matchedData, param } from "express-validator";
import { validate } from "./common";

import * as TransactionsModel from "../models/transactions";

const bodyTitle = body("title").trim().escape().notEmpty().isString();
// .isAlphanumeric();
const bodyAmount = body("amount").trim().escape().notEmpty().isFloat();
const bodyType = body("type").trim().escape().isIn(["INCOME", "EXPENSE"]);
const bodyDescription = body("description")
	.trim()
	.escape()
	.notEmpty()
	.isString();
const bodyAccountId = body("accountId")
	.trim()
	.escape()
	.notEmpty()
	.isInt({ min: 1 });
const paramAccountId = param("accountId")
	.trim()
	.escape()
	.notEmpty()
	.isInt({ min: 1 });

export const createTransaction = [
	bodyTitle,
	bodyAmount,
	bodyType,
	bodyDescription.optional(),
	bodyAccountId,
	validate,
	async (req: Request, res: Response) => {
		const { title, amount, type, description, accountId } = matchedData(req);

		const { error, result: newTransaction } = await TransactionsModel.create({
			title,
			amount: parseFloat(amount),
			type,
			description,
			account: { connect: { id: parseInt(accountId) } },
		});

		if (error) return res.sendStatus(500);

		res.status(201).json({
			data: newTransaction,
		});
	},
];

export const getTransactions = [
	paramAccountId,
	validate,
	async (req: Request, res: Response) => {
		const { accountId } = matchedData(req);
		const { error, result: transactions } =
			await TransactionsModel.selectByAccount(parseInt(accountId));
		if (error) return res.sendStatus(500);
		res.status(200).send({ data: transactions });
	},
];
