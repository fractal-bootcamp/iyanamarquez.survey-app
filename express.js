import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// callback func
const rootHandler = (req, res) => {
  res.json({ message: "Hello world" });
};

app.get("/", rootHandler);

app.get("/getSurveyQuestions/:id", async (req, res) => {
  const bodyParams = req.params;
  const surveyId = Number(bodyParams.id);
  const listOfQuestions = await prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
  });
  res.json({ listOfQuestions });
});

// how should i get answers per question?

app.listen(4000, () => {
  console.log("server running... on port 4000");
});
