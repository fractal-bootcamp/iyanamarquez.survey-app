import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function loader({ request, params }: LoaderFunctionArgs) {
    console.log(params)
    const oneSurvey = await prisma.survey.findFirst({
        where: { id: Number(params.id) },
    });
    return oneSurvey
}


export default function QuestionList(props) {

    return (
        <div >
            <h2>{ }</h2>


        </div>
    );
}
