import React, { Component } from 'react'
import Question from './Question'

import { loadQuestions } from '../helpers/QuestionsHelper'
import HUD from './HUD';
import SaveScoreForm from './SaveScoreForm';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            score: 0,
            questionNumber: 0,
            done: false,
        };
    }

    async componentDidMount() {
        try {
            const questions = await loadQuestions();
            this.setState({
                questions,
            }, () => {
                // ensure questions is populated before calling changeQuestion()
                this.changeQuestion();
            })
        } catch (error) {
            console.log(error);
        }
    }

    scoreSaved = () => {
        this.props.history.push('/');
    }

    changeQuestion = (bonus = 0) => {
        // don't change question if the user is on the last question
        if (this.state.questions.length === 0) {
            return this.setState((prevState) => ({
                done: true,
                score: prevState.score + bonus,
            }));
        }

        // get a random index of a question
        const randomQuestionIndex = Math.floor(Math.random() * this.state.questions.length);

        // set the current question to the question at that random index
        const currentQuestion = this.state.questions[randomQuestionIndex]

        // remove that question from the questions going forward
        const remainingQuestions = [...this.state.questions];

        // start at the random question index and remove one from the array
        remainingQuestions.splice(randomQuestionIndex, 1);

        // update state to reflect the changes
        this.setState((prevState) => ({
            questions: remainingQuestions,
            currentQuestion,
            loading: false,
            score: prevState.score += bonus,
            questionNumber: prevState.questionNumber + 1,
        }));
    }

    render() {
        const { loading, done, score, currentQuestion, questionNumber } = this.state;
        return (
            <>
                {loading && !done && <div id="loader" />}
                {!done && !loading && currentQuestion &&
                    <>
                        <HUD score={score} questionNumber={questionNumber} />
                        <Question
                            question={currentQuestion}
                            changeQuestion={this.changeQuestion}
                        />
                    </>
                }
                {done && <SaveScoreForm score={score} scoreSaved={this.scoreSaved} />}
            </>
        )
    }
}
