import { prisma } from "../helpers/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

async function register(data: {
  email: string;
  password: string;
}): Promise<User> {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const hash = { ...data, password: hashPassword };
  return await prisma.user.create({ data: hash });
}

function setToken(id: number, token: string | null = null): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: { token },
  });
}

function updateUserTempCode(
  id: number,
  tempCode: string,
  tempCodeExpiresAt: bigint | null
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: { tempCode, tempCodeExpiresAt },
  });
}

async function recoverPassword(
  tempCode: string,
  password: string
): Promise<User> {
  const hashPassword = await bcrypt.hash(password, 10);
  return prisma.user.update({
    where: { tempCode },
    data: { password: hashPassword, tempCode: null, tempCodeExpiresAt: null },
  });
}

export default {
  register,
  setToken,
  updateUserTempCode,
  recoverPassword,
};
