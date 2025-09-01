import { Picture } from "@prisma/client";
import { prisma } from "../helpers/prisma";

async function listPictures(): Promise<Picture[] | null> {
  return prisma.picture.findMany();
}

export default { listPictures };
