import questions from "@/data/questions.csv";
import router from "@/router";
const lsk = "MELEE_PERSONA_QUIZ_NUMBER";
const NUM_QUIZZES = 3;
const QUIZ_LENGTH = 20;
const app = {
  state: {
    randomizedQuestions: [],
    userAnswers: [],
  },
  mutations: {
    ADD_USER_ANSWER(state, value) { state.userAnswers.push(value); },
    SET_RANDOM_QUESTIONS(state, value) { state.randomizedQuestions = value; },
  },
  actions: {
    initQuiz({ commit }) {
      // start on a random quiz
      if (localStorage.getItem(lsk) == null) {
        localStorage.setItem(lsk, '' + Math.floor(Math.random() * NUM_QUIZZES));
      }
      let quizNumber = Number(localStorage.getItem(lsk));

      quizNumber = (quizNumber + 1) % NUM_QUIZZES;
      localStorage.setItem(lsk, quizNumber);

      const quizStartIndex = 1 + QUIZ_LENGTH * quizNumber;
      const questionSet = questions.map((question, i) => ({
        questionText: question[0],
        positivePrompt: question[1],
        neutralPrompt: question[2],
        negativePrompt: question[3],
        type: question[4],
        row: i,
      }))
        .slice(quizStartIndex, quizStartIndex + QUIZ_LENGTH);

      console.log('quiz number:', quizNumber);
      console.log(questions);
      console.log(questionSet);

      commit("SET_RANDOM_QUESTIONS", questionSet);



    },
    submitValue({ commit, state }, payload) {

      commit("ADD_USER_ANSWER", payload);

      if (state.userAnswers.length == QUIZ_LENGTH) {
        router.push("/results");
      }
    }
  },
  getters: {
    currentQuestionData(state) {
      if (state.quizNumber == -1) return {};

      return {


      }
    }
  }
};

export default app;
