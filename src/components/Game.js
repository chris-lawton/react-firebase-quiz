import React, { Component } from 'react'
import Question from './Question'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            currentQuestion: null
        };
    }

    async componentDidMount() {
        const url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

        try {
            const response = await fetch(url);
            const { results } = await response.json();

            // iterate over the questions from the API
            const questions = results.map(loadedQuestion => {

                // create a new object to match the shape of the question component
                const formattedQuestion = {
                    question: loadedQuestion.question,
                    answerChoices: [...loadedQuestion.incorrect_answers]
                }

                // generate random no. to be the point of insertion for the correct answer
                formattedQuestion.answer = Math.floor(Math.random() * 4);

                formattedQuestion.answerChoices.splice(
                    // start at the random no. index
                    formattedQuestion.answer,
                    // don't delete anything
                    0,
                    // add the correct answer
                    loadedQuestion.correct_answer
                );
                return formattedQuestion;
            });

            this.setState({questions, currentQuestion: questions[0]})
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                {this.state.currentQuestion &&
                    <Question question={this.state.currentQuestion} />
                }
            </>
        )
    }
}
