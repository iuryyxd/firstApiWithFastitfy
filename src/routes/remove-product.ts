import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";
import { z } from "zod";

export async function removeProduct(app: FastifyInstance) {
  const productSchema = z.object({
    productId: z.string().uuid().min(1, "Product ID is required"),
  });

  app.delete("/products", async (req, res) => {
    const { productId } = productSchema.parse(req.body);

    const removedProduct = await prismaClient.item.delete({
      where: {
        id: productId,
      },
    });

    return res.status(204).send({
      message: "Product removed successfully",
      product: removedProduct,
    });
  });
}