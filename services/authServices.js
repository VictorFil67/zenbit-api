import { prisma } from "../helpers/prisma.js";
import bcrypt from "bcrypt";

async function register(data) {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const hash = { ...data, password: hashPassword };
  return await prisma.user.create({ data: hash });
}

export default {
  register,
};
