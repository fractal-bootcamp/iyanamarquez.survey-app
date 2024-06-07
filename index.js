import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const createQuestion = await prisma.survey.create({
  //   data: { title: "Second Survey" },
  // });
  // console.log(allQuestions);
  // View all questions
  // const allQuestions = await prisma.survey.findMany();
  // console.log(allQuestions);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
