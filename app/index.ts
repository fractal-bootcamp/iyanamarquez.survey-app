import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteSurvey = async (requestId: number) => {
  const deleteQuestions = prisma.question.deleteMany({
    where: {
      surveyId: requestId,
    },
  });
  const deleteSpecificSurvey = prisma.survey.delete({
    where: {
      id: requestId,
    },
  });
  await prisma.$transaction([deleteQuestions, deleteSpecificSurvey]);
};

export const getAllSurveys = async () => {
  return await prisma.survey.findMany();
};

export const createNewSurvey = async (
  surveyName: string,
  surveyQuestion: string
) => {
  const createSurvey = await prisma.survey.create({
    data: {
      title: surveyName as string,
      questions: {
        create: [{ questions: surveyQuestion as string }],
      },
    },
  });
  return createSurvey;
};

export const createNewQuestionOnSurvey = async (
  surveyId: number,
  surveyQuestion: string
) => {
  const createSurvey = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        create: [{ questions: surveyQuestion as string }],
      },
    },
  });
  return createSurvey;
};

export const findQuestionsFromSurvey = async (surveyId: Number) => {
  return await prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
  });
};

// export const postAnswersToQuestions = async(
//     questionId: number,
//     answers
// ) =>{

// }
