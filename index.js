import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const createQuestion = await prisma.survey.create({
  //   data: { title: "Second Survey" },
  // });
  // console.log(allQuestions);
  // Add new question
  // const addQuestionToSurvey = await prisma.survey.update({
  //   where: {
  //     id: 27,
  //   },
  //   data: {
  //     questions: {
  //       create: [{ questions: "why catssssss?" }],
  //     },
  //   },
  // });
  // console.log(addQuestionToSurvey);
  // View all questions
  const allQuestions = await prisma.question.findMany();
  console.log(allQuestions);
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
