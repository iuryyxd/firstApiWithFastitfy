import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prismaClient } from "../prisma";

export async function updateProduct(app: FastifyInstance) {
  const productSchema = z.object({
    productName: z.string().min(1, "Product name min length is 1").optional(),
    measure: z.string().min(1, "Measure min length is 1").optional(),
    quantity: z
      .number()
      .int()
      .positive()
      .min(1, "Quantity min length is 1")
      .optional(),
    productId: z.string().uuid().min(1, "Product ID is required"),
  });

  app.put("/products", async (req, res) => {
    const { productName, measure, quantity, productId } = productSchema.parse(
      req.body
    );

    const productExists = await prismaClient.item.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      return res.status(400).send({
        error: "Product not found",
      });
    }

    const product = await prismaClient.item.update({
      where: {
        id: productId,
      },
      data: {
        productName,
        measure,
        quantity,
      },
    });
    return res.status(201).send({
      message: "Product updated successfully",
      product,
    });
  });
}
