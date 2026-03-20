import { body, matchedData } from "express-validator";
import { type NextFunction, type Request, type Response } from "express";
import argon2 from "argon2";
import Passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { validate } from "./common";

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
const bodyUsername = body("username").trim().escape().notEmpty().isEmail();
const bodyPasswordRegister = body("password")
	.trim()
	.escape()
	.notEmpty()
	.isLength({ min: 8 });
const bodyPassword = body("password").trim().escape().notEmpty();
// .isStrongPassword({ minLength: 8 });

Passport.use(
	new LocalStrategy(async function verify(email: string, password: string, cb) {
		const { result: user, error } = await AuthModel.selectByEmail(email);
		if (error) return cb(error);

		try {
			if (await argon2.verify(user!.password, password)) {
				return cb(null, user);
			}
			return cb(null, false);
		} catch (error: any) {
			return cb(error);
		}
	}),
);

Passport.serializeUser(function (user: any, cb) {
	process.nextTick(function () {
		cb(null, user.id);
	});
});

Passport.deserializeUser(function (id: any, cb) {
	process.nextTick(async function () {
		const { result: user, error } = await UserModel.selectById(id);
		if (error) return cb(null, false);
		return cb(null, user);
	});
});

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.user) return next();
	res.sendStatus(401);
};

export const checkAuth = [
	isAuthenticated,
	async (req: Request, res: Response) => {
		res.status(200).send(req.user);
	},
];

export const login = [
	bodyUsername,
	bodyPassword,
	validate,
	Passport.authenticate("local"),
	(req: Request, res: Response) => {
		delete (req.user! as any).password;
		return res.status(200).send({ user: req.user });
	},
];

export const register = [
	bodyName,
	bodyLastName,
	bodyEmail,
	bodyPasswordRegister,
	validate,
	async (req: Request, res: Response) => {
		const requestData = matchedData(req);

		const { result: user } = await UserModel.selectByEmail(requestData.email);

		if (user != undefined) return res.sendStatus(409);

		const hashedPassword = await argon2.hash(requestData.password);

		const { error: createError } = await AuthModel.create({
			email: requestData.email,
			lastName: requestData.lastName,
			name: requestData.name,
			password: hashedPassword,
		});

		if (createError) return res.sendStatus(500);

		res.sendStatus(200);
	},
];

export const logout = [
	isAuthenticated,
	(req: Request, res: Response, next: NextFunction) => {
		req.logout((err) => {
			if (err) return next(err);
			res.sendStatus(200);
		});
	},
];
