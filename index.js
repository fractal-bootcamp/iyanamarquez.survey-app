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

  const newAnswer = await prisma.answer.create({
    data: {
      answer: "here another2 the answer to the question",
      questionId: 31,
    },
  });
  console.log(newAnswer);
  const allAnswers = await prisma.answer.findMany();

  console.log(allAnswers);
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
