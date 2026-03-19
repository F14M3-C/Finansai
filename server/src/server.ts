import express from "express";
import expressSession from "express-session";
import authRouter from "./routes/auth";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma";
import "dotenv/config";

const { SESSION_SECRET } = process.env;
import transactionsRouter from "./routes/transactions";
const PORT = 3000;

const app = express();

app.use(
	expressSession({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000,
		},
		secret: SESSION_SECRET ?? "hunter2",
		resave: true,
		saveUninitialized: false,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			// dbRecordIdFunction: undefined,
		}),
	}),
);
app.use(passport.authenticate("session"));
app.use(express.json());
app.use("/api/transactions", transactionsRouter);

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
