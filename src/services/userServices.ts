import { User } from "@prisma/client";
import { prisma } from "../helpers/prisma";

async function findUser(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function getUser(tempCode: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { tempCode },
  });
}
async function findUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export default { findUser, getUser, findUserById };
