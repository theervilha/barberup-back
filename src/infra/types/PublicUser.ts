import { Prisma } from "@prisma/client";

export type UserPublic = Omit<Prisma.UserGetPayload<{}>, "password">;
