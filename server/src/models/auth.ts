import type { UserCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export const selectByEmail = async (email: string) => {
	try {
		const result = await prisma.user.findFirstOrThrow({
			where: {
				email,
			},
		});
		return { result };
	} catch (error: any) {
		console.error(error);
		return { error };
	}
};

export const createUser = async (data: UserCreateInput) => {
	try {
		await prisma.user.create({ data });
		return {};
	} catch (error) {
		console.error(error);
		return { error };
	}
};
