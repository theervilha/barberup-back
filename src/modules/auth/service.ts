import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "../../infra/errors/UserAlreadyExistsError";
import { UserNotFoundError } from "../../infra/errors/UserNotFoundError";
import { authRepository } from "./repository";
import { AuthInput } from "./validators/auth.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.jwt_secret_code as string;
const JWT_EXPIRES_IN = "7d";

export const authService = {
  async register(data: AuthInput) {
    const existingUser = await authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(data.email);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await authRepository.createUser({
      email: data.email,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return { user: userWithoutPassword, token };
  },

  async login(data: AuthInput) {
    const existingUser = await authRepository.findByEmail(data.email);
    if (!existingUser) {
      throw new UserNotFoundError();
    }

    const matchPassword = await bcrypt.compare(
      data.password,
      existingUser.password,
    );
    if (matchPassword) {
      const { password, ...userWithoutPassword } = existingUser;
      const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      return { user: userWithoutPassword, token };
    }

    throw new UserNotFoundError();
  },

  getUserFromToken(token: string): Promise<User | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, async (err, payload: any) => {
        if (err || !payload) {
          return resolve(null);
        }

        try {
          const user = await authRepository.findById(payload.id);

          if (!user) {
            return resolve(null);
          }

          resolve(user);
        } catch {
          resolve(null);
        }
      });
    });
  },
};
