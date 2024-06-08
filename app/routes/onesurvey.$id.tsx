import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useParams } from "@remix-run/react";
import Header from "~/components/Header";
import { PrismaClient } from "@prisma/client";
import { createNewQuestionOnSurvey } from "..";

const prisma = new PrismaClient();

export async function action({
    request, params
}: ActionFunctionArgs) {
    const requestBody = await request.formData();
    const newQuestion = requestBody.get("newQuestion") as string;
    const surveyId = Number(params.id);

    // const surveyQuestion = requestBody.get("surveyQuestion");
    const createQuestionOnSurvey = await createNewQuestionOnSurvey(surveyId, newQuestion)

    return { createQuestionOnSurvey };
}

export async function loader({ request, params }: LoaderFunctionArgs) {
    console.log(params)
    const survey = await prisma.survey.findFirst({
        where: { id: Number(params.id) },
    });
    // return oneSurvey

    const allQuestionsFromSurvey = await prisma.question.findMany({ where: { surveyId: Number(params.id) } })
    return { survey, allQuestionsFromSurvey }
}

export default function SurveyDefault() {
    const newQuestionData = useActionData<typeof action>();
    console.log('action', newQuestionData)


    const data = useLoaderData<typeof loader>();
    const surveyData = data.survey
    const questionData = data.allQuestionsFromSurvey

    // add question to survey and refresh page?


    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Header />
            <h1>Survey {surveyData?.id}</h1>
            <h2>{surveyData?.title}</h2>
            <h3>Questions</h3>
            {questionData.map((x) => {
                return <li key={x.id}>{x.questions}</li>
            })}
            <Form method="post">
                <label>New question
                    <input type="hidden" key={surveyData?.id} name='surveyId'></input>
                    <input type="text" name='newQuestion'></input>

                </label>
                <button type='submit'>create new question</button>
            </Form>



        </div>
    );
}
