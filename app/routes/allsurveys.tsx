import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import Header from "~/components/Header";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function action({
    request,
}: ActionFunctionArgs) {
    // console.log('log')

    const allSurveys = await prisma.survey.findMany();
    // console.log(allSurveys);

    // const allQuestions = await prisma.question.findMany();
    // console.log(allQuestions);

    const requestBody = await request.formData();
    // const fieldName = requestBody.get("surveyQuestion");


    return json({ allSurveys });

}



export default function SurveyPage() {
    const data = useActionData<typeof action>();
    console.log('data:', data)

    return (
        <>
            <Header />
            <h1>All surveys</h1>
        </>
    );
}
