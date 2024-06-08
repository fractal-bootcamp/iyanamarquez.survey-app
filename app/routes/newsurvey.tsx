import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import Header from "~/components/Header";
import { createNewSurvey, getAllSurveys } from "..";

export async function action({
    request,
}: ActionFunctionArgs) {

    const requestBody = await request.formData();
    const surveyName = requestBody.get("surveyName");
    const surveyQuestion = requestBody.get("surveyQuestion");
    const createSurvey = await createNewSurvey(surveyName, surveyQuestion)

    return createSurvey;
}

export default function SurveyPage() {
    useActionData<typeof action>();

    return (
        <>
            <Header />
            <h1>Survey Form </h1>
            <Form method="post" >
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
