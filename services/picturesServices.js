import { prisma } from "../helpers/prisma.js";

function listPictures() {
  return prisma.picture.findMany();
}

export default { listPictures };
