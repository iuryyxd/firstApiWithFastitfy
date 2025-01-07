import { fastify } from "fastify";
import { createList } from "../routes/create-list";
import { listLists } from "../routes/list-lists";
import { addProduct } from "../routes/add-product";
import { removeProduct } from "../routes/remove-product";
import { updateProduct } from "../routes/update-product";
import { getListById } from "../routes/get-list-by-id";

const app = fastify({
  logger: true,
});

app.register(createList);
app.register(listLists);
app.register(addProduct);
app.register(removeProduct);
app.register(updateProduct);
app.register(getListById);

app.listen({
  port: 3001,
  host: "0.0.0.0",
});
