import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";

export async function listLists(app: FastifyInstance) {
  app.get("/lists", async (req, res) => {
    const lists = await prismaClient.list.findMany({
      include: {
        items: true,
      },
    });
    return res.status(200).send(lists);
  });
}
