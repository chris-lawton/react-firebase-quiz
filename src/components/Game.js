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

    changeQuestion = (bonus = 0) => {
        // don't change question if the user is on the last question
        if (this.state.questions.length === 0) return this.setState({done: true})

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
        return (
            <>
                {this.state.loading && !this.state.done && <div id="loader" />}
                {!this.state.done && !this.state.loading && this.state.currentQuestion &&
                    <>
                        <HUD score={this.state.score} questionNumber={this.state.questionNumber} />
                        <Question
                            question={this.state.currentQuestion}
                            changeQuestion={this.changeQuestion}
                        />
                    </>
                }
                {this.state.done && <SaveScoreForm score={this.state.score} />}
            </>
        )
    }
}
