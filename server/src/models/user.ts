import { prisma } from "../lib/prisma";

export const selectByEmail = async (email: string) => {
	try {
		const result = await prisma.user.findFirstOrThrow({
			where: {
				email,
			},
			omit: {
				password: true,
			},
		});
		return { result };
	} catch (error: any) {
		console.error(error);
		return { error };
	}
};

export const selectById = async (id: number) => {
	try {
		const result = await prisma.user.findFirstOrThrow({
			where: {
				id: Number(id),
			},
			omit: {
				password: true,
			},
		});
		return { result };
	} catch (error: any) {
		console.error(error);
		return { error };
	}
};
