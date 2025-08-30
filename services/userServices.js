import { prisma } from "../helpers/prisma.js";

async function findUser(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function getUser(tempCode) {
  return await prisma.user.findUnique({
    where: { tempCode },
  });
}
async function findUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export default { findUser, getUser, findUserById };
