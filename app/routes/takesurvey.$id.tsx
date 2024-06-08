import type { MetaFunction } from "@remix-run/node";
import { Form, Link, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import Header from "~/components/Header";


export default function TakeSurvey() {

    // get id of survey from params
    // display  list of questions with answer boxes next to them, 
    // on submit send answer data to question
    // need a view results, lists each question with every answer submitted 
    // question:
    //  list of answer - answer1, - answer2

    const params = useParams()
    const id = params.id

    const [survey, setSurvey] = useState([]);
    const [questionIds, setQuestionIds] = useState([])
    const [answers, setAnswers] = useState({})


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

    // how to handle dynamic number of inputs and get set their values?
    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;

        setAnswers({
            ...answers,
            [name]: value,
        });
        console.log(answers)
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Header />
            <h1>Home</h1>
            <Form>
                {survey.map((x, idx) => {
                    return <>
                        <div>{x.questions}</div>
                        <input key={idx} type="text" onChange={handleInputChange} name="answerInput" value={answers.idx}></input>
                    </>
                })}
                <br></br>
                <button type="submit">
                    submit survey
                </button>
            </Form>


        </div>
    );
}
