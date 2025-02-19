import { prisma } from "./prisma";
import sampleData from "./sample-data";

const main = async () => {
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database seeded successfully!");
};

main();
