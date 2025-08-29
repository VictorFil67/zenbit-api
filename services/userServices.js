import { prisma } from "../helpers/prisma.js";

async function findUser(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export default { findUser };
