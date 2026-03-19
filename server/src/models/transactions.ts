import type { TransactionCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export const create = async (data: TransactionCreateInput) => {
	try {
		const result = await prisma.transaction.create({ data });
		return { result };
	} catch (error: any) {
		console.error(error);
		return { error };
	}
};

export const selectByAccount = async (accountId: number) => {
	try {
		const result = await prisma.transaction.findMany({
			where: {
				accountId,
			},
		});
		return { result };
	} catch (error: any) {
		console.log(error);
		return { error };
	}
};
