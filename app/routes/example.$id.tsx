import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useParams } from "@remix-run/react";
import Header from "~/components/Header";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


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
    const data = useLoaderData<typeof loader>();
    console.log('data', data)
    const surveyData = data.survey
    const questionData = data.allQuestionsFromSurvey
    console.log(surveyData)

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

                    <input type="text"></input>

                </label>
                <button type="submit">create new question</button>
            </Form>



        </div>
    );
}
