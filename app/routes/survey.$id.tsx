import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, useActionData, useLoaderData, useParams } from "@remix-run/react";
import Header from "~/components/Header";
import { PrismaClient } from "@prisma/client";
import { createNewQuestionOnSurvey } from "..";
import { useTransition } from "react";

const prisma = new PrismaClient();

enum FormNames {
    NEW_QUESTION_FORM = 'newQuestionForm',
    SUBMIT_SURVEY_FORM = 'submitSurveyForm',
}


export async function action({
    request, params
}: ActionFunctionArgs) {
    await new Promise((res) => setTimeout(res, 1000));

    const formData = await request.formData();
    const formQuestion = formData.get('newQuestion') as string;

    const surveyId = Number(params.id);
    const createNewQuestion = async (surveyId: number, formQuestion: string) => {
        const createNewQuestion = await createNewQuestionOnSurvey(surveyId, formQuestion)
        return createNewQuestion
    }
    createNewQuestion(surveyId, formQuestion)
    return { name: 'hello' };


}

export async function loader({ request, params }: LoaderFunctionArgs) {
    const survey = await prisma.survey.findFirst({
        where: { id: Number(params.id) },
    });
    // return oneSurvey

    const allQuestionsFromSurvey = await prisma.question.findMany({ where: { surveyId: Number(params.id) } })
    return { survey, allQuestionsFromSurvey }
}

export default function SurveyDefault() {
    useActionData<typeof action>();
    const data = useLoaderData<typeof loader>();
    const surveyData = data.survey
    const questionData = data.allQuestionsFromSurvey
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Header />
            {/* <h1>Survey {surveyData?.id}</h1> */}
            <h2>{surveyData?.title}</h2>

            <Form method="post">
                <label>New question
                    <input type="text" key={surveyData?.id} name='newQuestion'></input>

                </label>
                <button type='submit' name='formName' >create new question</button>
            </Form>

            <h3>Questions</h3>
            {questionData.map((x) => {
                return <li key={x.id}>{x.questions}
                </li>
            })}
            <Link to={`/takesurvey/${surveyData?.id}`}>
                <button name='formName' key={surveyData?.id} >Take Survey</button>
            </Link>
            {/* should link to results of survey */}
            <Link to={`/viewsurveyresults/${surveyData?.id}`}>
                <button name='formName' key={surveyData?.id} >View Survey Results</button>
            </Link>


        </div >
    );
}
