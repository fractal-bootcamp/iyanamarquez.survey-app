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
