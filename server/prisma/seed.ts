import { prisma } from "../src/lib/prisma";
import argon2 from "argon2";

async function main() {
	const hashedPassword = await argon2.hash("password!");

	const petras = await prisma.user.create({
		data: {
			name: "Petras",
			lastName: "Petraitis",
			email: "petras@pertaitis.com",
			password: hashedPassword,
			accounts: {
				create: [
					{
						title: "Main Account",
						accountNumber: "LT1234567890",
						balance: 1500.5,
						transactions: {
							create: [
								{
									title: "Salary",
									amount: 2000,
									type: "INCOME",
									description: "Monthly salary",
								},
								{
									title: "Groceries",
									amount: 100,
									type: "EXPENSE",
									description: "Food shopping",
								},
							],
						},
					},
					{
						title: "Savings",
						accountNumber: "LT0987654321",
						balance: 5000,
						transactions: {
							create: [
								{
									title: "Initial deposit",
									amount: 5000,
									type: "INCOME",
								},
							],
						},
					},
				],
			},
		},
	});

	const jonas = await prisma.user.create({
		data: {
			name: "Jonas",
			lastName: "Jonaitis",
			email: "jonas@jonaitis.com",
			password: hashedPassword,
			accounts: {
				create: [
					{
						title: "Daily",
						accountNumber: "LT5555555555",
						balance: 300,
						transactions: {
							create: [
								{
									title: "Freelance",
									amount: 500,
									type: "INCOME",
								},
								{
									title: "Fuel",
									amount: 200,
									type: "EXPENSE",
								},
							],
						},
					},
				],
			},
		},
	});

	console.log("Seed done:", { petras, jonas });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
