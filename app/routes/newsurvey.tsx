import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import Header from "~/components/Header";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function action({
    request,
}: ActionFunctionArgs) {

    // Get all surveys
    const allSurveys = await prisma.survey.findMany();

    const requestBody = await request.formData();
    const surveyName = requestBody.get("surveyName");
    const surveyQuestion = requestBody.get("surveyQuestion");


    const createSurvey = await prisma.survey.create({
        data: {
            title: surveyName as string,
            questions: {
                create: [
                    { questions: surveyQuestion as string }
                ]
            }
        },
    })
    createSurvey
    return json({ allSurveys });

}



export default function SurveyPage() {
    const data = useActionData<typeof action>();
    return (
        <>
            <Header />
            <h1>Survey Form </h1>
            <Form method="post">
                <label>
                    Survey Name
                    <input type="text" name='surveyName' />
                </label>
                <br></br>
                <label>
                    Survey Question
                    <input type="text" name='surveyQuestion' />
                </label>
                <br></br>
                <button type="submit">Submit!</button>
            </Form></>
    );
}
