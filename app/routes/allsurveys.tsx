import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, NavLink, redirect, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import Header from "~/components/Header";
import { deleteSurvey, getAllSurveys } from "..";
import { useState } from "react";

export async function action({
    request,
}: ActionFunctionArgs) {
    const requestBody = await request.formData();
    const intent = requestBody.get('intent')
    const requestId = Number(requestBody.get('id'))
    // Delete
    const runDeleteSurvey = async (requestId: number) => {
        await deleteSurvey(requestId)

    }
    switch (intent) {
        case "update": console.log('update logic'); break;
        case "delete": await runDeleteSurvey(requestId); break;
        default: throw new Error("Unexpected action");
    }

    return json({ ok: true });
}

export async function loader() {
    const allSurveys = await getAllSurveys()
    return allSurveys
}

export default function SurveyList() {
    const dataAction = useActionData<typeof action>();
    const data = useLoaderData<typeof loader>();


    return (
        <>
            <Header />
            <h1>All surveys</h1>
            <ul>
                {data.map((x) => {
                    return <div key={x.id}>
                        <Form method="post" reloadDocument>
                            <NavLink to={`/survey/${x.id}`}>
                                {x.title}
                            </NavLink>
                            <input type="hidden" name="id" value={x.id}></input>
                            {/* <button type="submit" name="intent" value='update'>Update</button> */}
                            <button type="submit" name="intent" value='delete'>Delete</button>
                        </Form>
                    </div>
                })}
            </ul>

        </>
    );
}
