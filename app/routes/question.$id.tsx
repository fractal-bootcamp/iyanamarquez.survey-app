// import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
// import { Link, useLoaderData, useParams } from "@remix-run/react";
// import Header from "~/components/Header";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();


// export async function loader({ request, params }: LoaderFunctionArgs) {
//     console.log(params)
//     const oneSurvey = await prisma.survey.findFirst({
//         where: { id: Number(params.id) },
//     });
//     return oneSurvey
// }

// export default function ShowQues() {
//     const params = useParams();
//     const data = useLoaderData<typeof loader>();
//     console.log(data)

//     return (
//         <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
//             <Header />
//             <h1>Survey {data.id}</h1>
//             <h2>{data.title}</h2>

//         </div>
//     );
// }
