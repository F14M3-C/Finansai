import { body, matchedData, validationResult } from "express-validator";
import { type NextFunction, type Request, type Response } from "express";
import argon2 from "argon2";

import * as AuthModel from "../models/auth";
import * as UserModel from "../models/user";

const bodyName = body("name")
	.trim()
	.escape()
	.notEmpty()
	.isString()
	.isAlphanumeric();
const bodyLastName = body("lastName")
	.trim()
	.notEmpty()
	.isString()
	.isAlphanumeric();
const bodyEmail = body("email").trim().escape().notEmpty().isEmail();
const bodyPassword = body("password")
	.trim()
	.escape()
	.notEmpty()
	.isLength({ min: 8 });
// .isStrongPassword({ minLength: 8 });

const validate = (req: Request, res: Response, next: NextFunction) => {
	const result = validationResult(req);
	if (result.isEmpty()) next();
	else res.status(400).send({ errors: result.array() });
};

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Return 401 if we are not authenticated.
	next();
};

export const checkAuth = [
	isAuthenticated,
	async (req: Request, res: Response) => {
		// If we are authenticated, return info of the authenticated user.
		res.sendStatus(501);
	},
];

export const login = [
	bodyEmail,
	bodyPassword,
	validate,
	async (req: Request, res: Response) => {
		const requestData = matchedData(req);

		// Fetch account from email and if it exists, compare passwords before authenticating
		const { error, result: user } = await AuthModel.selectByEmail(
			requestData.email,
		);
		if (error) return res.sendStatus(500);

		const loginSuccess = await argon2.verify(
			user!.password,
			requestData.password,
		);

		if (loginSuccess) {
			return res.sendStatus(200);
		}

		return res.sendStatus(401);
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

		const { result: user } = await UserModel.selectByEmail(requestData.email);

		if (user != undefined) return res.sendStatus(409);

		const hashedPassword = await argon2.hash(requestData.password);

		const { error: createError } = await AuthModel.createUser({
			email: requestData.email,
			lastName: requestData.lastName,
			name: requestData.name,
			password: hashedPassword,
		});

		if (createError) return res.sendStatus(500);

		res.sendStatus(200);
	},
];
