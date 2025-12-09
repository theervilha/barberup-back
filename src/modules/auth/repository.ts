import { prisma, Prisma } from "../../config/database";

export const authRepository = {
  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  },

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  },

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  },
};
