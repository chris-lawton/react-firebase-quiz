import React, { useState, useEffect, useCallback } from 'react'
import Question from './Question'

import { loadQuestions } from '../helpers/QuestionsHelper'
import HUD from './HUD';
import SaveScoreForm from './SaveScoreForm';

export default function Game({ history }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        loadQuestions()
            .then(questions => setQuestions(questions))
            .catch(err => console.error(err));
    }, []);

    const scoreSaved = () => {
        history.push('/');
    }

    const changeQuestion = useCallback((bonus = 0) => {
        // don't change question if the user is on the last question
        if (questions.length === 0) {
            setDone(true);
            return setScore(score + bonus);
        }

        // get a random index of a question
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);

        // set the current question to the question at that random index
        const currentQuestion = questions[randomQuestionIndex]

        // remove that question from the questions going forward
        const remainingQuestions = [...questions];

        // start at the random question index and remove one from the array
        remainingQuestions.splice(randomQuestionIndex, 1);

        // update state to reflect the changes
        setQuestions(remainingQuestions);
        setCurrentQuestion(currentQuestion);
        setLoading(false);
        setScore(score + bonus);
        setQuestionNumber(questionNumber + 1);
    }, [score, questionNumber, questions, setQuestions, setLoading, setCurrentQuestion, setQuestionNumber]);

    useEffect(() => {
        if (!currentQuestion && questions.length) {
            changeQuestion();
        }
    }, [currentQuestion, questions, changeQuestion])


    return (
        <>
            {loading && !done && <div id="loader" />}
            {!done && !loading && currentQuestion &&
                <>
                    <HUD score={score} questionNumber={questionNumber} />
                    <Question
                        question={currentQuestion}
                        changeQuestion={changeQuestion}
                    />
                </>
            }
            {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
        </>
    )
}
