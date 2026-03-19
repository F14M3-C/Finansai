import { prisma } from "../lib/prisma";
import * as bcrypt from "bcryptjs";

async function main() {

  const hashedPassword = await bcrypt.hash("password!", 12)


  const petras = await prisma.User.create({
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
            balance: 1500.50,
            transactions: {
              create: [
                {
                  title: "Salary",
                  amount: 2000,
                  type: "INCOME",
                  description: "Monthly salary"
                },
                {
                  title: "Groceries",
                  amount: 100,
                  type: "EXPENSE",
                  description: "Food shopping"
                }
              ]
            }
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
                  type: "INCOME"
                }
              ]
            }
          }
        ]
      }
    }
  })

  const jonas = await prisma.User.create({
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
                  type: "INCOME"
                },
                {
                  title: "Fuel",
                  amount: 200,
                  type: "EXPENSE"
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log("Seed done:", { petras, jonas })
}
   

    main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });