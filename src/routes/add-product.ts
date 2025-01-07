import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";
import { z } from "zod";

export async function addProduct(app: FastifyInstance) {
  const productSchema = z.object({
    productName: z.string().min(1, "Product name is required"),
    measure: z.string().min(1, "Measure is required"),
    quantity: z.number().int().positive().min(1, "Quantity is required"),
    listId: z.string().uuid().min(1, "List ID is required"),
  });

  app.post("/products", async (req, res) => {
    const { productName, measure, quantity, listId } = productSchema.parse(
      req.body
    );

    const product = await prismaClient.item.create({
      data: {
        productName,
        measure,
        quantity,
        listId,
      },
    });
    return res.status(201).send({
      message: "Product added successfully",
      product,
    });
  });
}
