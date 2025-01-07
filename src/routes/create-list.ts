import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaClient } from "../prisma";

export async function createList(app: FastifyInstance) {
  const listSchema = z.object({
    title: z.string().min(1, "Title is required"),
  });

  app.post("/lists", async (req, res) => {
    const { title } = listSchema.parse(req.body);
    const alreadyExists = await prismaClient.list.findFirst({
      where: {
        title,
      },
    });

    if (alreadyExists) {
      return res.status(400).send({
        error: "List already exists",
      });
    }

    const list = await prismaClient.list.create({
      data: {
        title,
      },
    });

    return res.status(201).send(list);
  });
}
