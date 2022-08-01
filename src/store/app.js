import csv from "@/data/questions.csv";
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
    RESET_USER_ANSWERS(state) { state.userAnswers = []; },
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

      const quizStartIndex = QUIZ_LENGTH * quizNumber + 1; // we add one here because the first row of the csv contains prompts and character names
      const questionSet = csv.map((question, i) => ({
        questionText: question[0],
        positivePrompt: question[1],
        neutralPrompt: question[2],
        negativePrompt: question[3],
        type: question[4],
        row: i,
      }))
        .slice(quizStartIndex, quizStartIndex + QUIZ_LENGTH)
        .sort(() => 0.5 - Math.random()); // lmao


      console.log('quiz number:', quizNumber);
      console.log(csv);
      console.log(questionSet);

      commit("RESET_USER_ANSWERS");
      commit("SET_RANDOM_QUESTIONS", questionSet);

    },
    submitValue({ commit, state }, payload) {

      commit("ADD_USER_ANSWER", payload);

      console.log(state.userAnswers);

      if (state.userAnswers.length == QUIZ_LENGTH) {
        router.push("/results");
      }
    }
  },
  getters: {
    currentQuestionData(state) {
      if (state.userAnswers.length == QUIZ_LENGTH) return {};
      return state.randomizedQuestions[state.userAnswers.length];
    },
    results(state) {
      if (state.userAnswers.length != QUIZ_LENGTH) return [];

      const dataColumnStart = 5;

      // reassociate random answers with csv rows (this wants to be a zip lol)
      const sortedUserAnswers = state.userAnswers.map((answer, i) => ({ answer, row: state.randomizedQuestions[i].row }));
      sortedUserAnswers.sort((a, b) => a.row - b.row);

      console.log(sortedUserAnswers);
      return csv[0].slice(dataColumnStart);


      /*
      return csv[0].slice(dataColumnStart).map((charTitle, i) => {

        const col = i + dataColumnStart;
        let distance = 0;


        // slicing 1 and adding 1 to i because we are skipping the first row of the csv
        csv.slice(1).forEach(question => {
          distance += (question[col] - state.userAnswers[i + 1].row) ** 2;
        });

        return {
          charTitle,
          distance: Math.sqrt()
        };
      });
      */
    }

  }
};

export default app;
