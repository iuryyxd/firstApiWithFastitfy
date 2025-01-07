-- CreateTable
CREATE TABLE "lists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "measure" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
