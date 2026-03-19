import { body, matchedData, validationResult } from "express-validator";
import { type NextFunction, type Request, type Response } from "express";
import argon2 from "argon2";

const bodyName = body("name").trim().notEmpty().isString();
const bodyLastName = body("lastName").trim().notEmpty().isString();
const bodyEmail = body("email").trim().notEmpty().isEmail();
const bodyPassword = body("password").trim().notEmpty().isLength({ min: 8 });
// .isStrongPassword({ minLength: 8 });

function validate(req: Request, res: Response, next: NextFunction) {
	const result = validationResult(req);
	if (result.isEmpty()) next();
	else res.status(400).send({ errors: result.array() });
}

export const checkAuth = [
	async (req: Request, res: Response) => {
		res.sendStatus(501);
	},
];

export const login = [
	bodyEmail,
	bodyPassword,
	validate,
	async (req: Request, res: Response) => {
		const requestData = matchedData(req);

		res.sendStatus(501);
	},
];

export const register = [
	bodyName,
	bodyLastName,
	bodyEmail,
	bodyPassword,
	validate,
	async (req: Request, res: Response) => {
		const requestData = matchedData(req);

		// Check if Email is not in use

		const hashedPassword = await argon2.hash(requestData.password);

		// Create account
		res.sendStatus(501);
	},
];
