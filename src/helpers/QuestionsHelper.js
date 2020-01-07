export const loadQuestions = async (amount = 10, category = 9, difficulty = 'easy', type = 'multiple') => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    try {
        const response = await fetch(url);
        const { results } = await response.json();
        return convertQuestionsFromAPI(results);
    } catch (err) {
        console.log(err);
    }
};


const convertQuestionsFromAPI = rawQuestions => {
    // iterate over the questions from the API
    return rawQuestions.map(loadedQuestion => {

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
}
