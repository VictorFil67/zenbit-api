import { prisma } from "../helpers/prisma.js";
import bcrypt from "bcrypt";

async function register(data) {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const hash = { ...data, password: hashPassword };
  return await prisma.user.create({ data: hash });
}

function setToken(id, token = null) {
  return prisma.user.update({
    where: { id },
    data: { token },
  });
}

function updateUserTempCode(id, tempCode, tempCodeExpiresAt) {
  return prisma.user.update({
    where: { id },
    data: { tempCode, tempCodeExpiresAt },
  });
}

async function recoverPassword(tempCode, password) {
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
