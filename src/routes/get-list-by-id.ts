import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaClient } from "../prisma";

export async function getListById(app: FastifyInstance) {
  const listSchema = z.object({
    listId: z.string().uuid().min(1, "List ID is required"),
  });

  app.get("/lists/:listId", async (req, res) => {
    const { listId } = listSchema.parse(req.params);
    const lists = prismaClient.list.findUnique({
      where: {
        id: listId,
      },
      include: {
        items: true,
      },
    });

    return res.status(200).send(lists);
  });
}
