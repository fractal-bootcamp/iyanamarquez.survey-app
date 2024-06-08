import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import Header from "~/components/Header";
import { findQuestionsFromSurvey, getAllSurveys } from "..";
import { useEffect, useState } from "react";




export default function ViewSurveyResults() {
    const params = useParams()
    const id = params.id

    const [survey, setSurvey] = useState([]);
    const [questionIds, setQuestionIds] = useState([])
    const [answers, setAnswers] = useState([])


    useEffect(() => {
        fetch(`http://localhost:4000/getSurveyQuestions/${id}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const questionList = data.listOfQuestions
                setSurvey(questionList)
                const newArr = questionList.map((x) => {
                    return Number(x.id)
                })
                setQuestionIds(newArr)
            })

    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:4000/getAnswersFromQuestion", {
    //         method: "POST", // or 'PUT'
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(questionIds),
    //     }).then((res) => {
    //         return res.json()
    //     })
    //         .then((data) => {
    //             console.log('erm', data)
    //         });
    // }, [questionIds])


    // need list of answers
    // need all the question ids
    // list answers per question id


    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Header />
            <h1>Home</h1>
            {survey.map((x) => {
                return <div>{x.id}</div>
            })}
            <button>
                hello
            </button>
        </div>
    );
}
