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
      //console.log(csv);
      console.log(questionSet);

      commit("RESET_USER_ANSWERS");
      commit("SET_RANDOM_QUESTIONS", questionSet);

    },
    submitValue({ commit, state }, answer) {

      commit("ADD_USER_ANSWER", answer);

      if (state.userAnswers.length == QUIZ_LENGTH) {
        router.replace("/results");
      }
    },
    DEBUG_submitAllRandomValues({ commit, state }) {
      while ((state.userAnswers.length != QUIZ_LENGTH)) {
        commit("ADD_USER_ANSWER", Math.random());
      }
      //console.log(state.userAnswers);
      router.replace("/results");
    },
    DEBUG_submitAllAnswersForChar({ commit, state }) {
      const col = csv[0].indexOf("dr_mario");

      while ((state.userAnswers.length != QUIZ_LENGTH)) {
        const i = state.userAnswers.length;
        const row = state.randomizedQuestions[i].row;
        const charWeight = csv[row][col] === '' ? 0.5 : Number(csv[row][col]); // TODO: placeholder logic until the matrix is filled out
        //console.log(charWeight);
        commit("ADD_USER_ANSWER", charWeight);
      }
      router.replace("/results");
    }
  },
  getters: {
    currentQuestionData(state) {
      if (state.userAnswers.length == QUIZ_LENGTH) return {};
      return state.randomizedQuestions[state.userAnswers.length];
    },
    results(state) {
      if (state.userAnswers.length != QUIZ_LENGTH) return csv[0].slice(dataColumnStart).map(() => ({ characterKey: '', similarity: 0 })); // could be cleaner. "Always return valid objects" approach is good enough for now, should have checks in Results.vue tbh

      const dataColumnStart = 5;

      // reassociate random answers with csv rows (this wants to be a zip lol)
      const associatedUserAnswers = state.userAnswers.map((answer, i) => ({ answer, row: state.randomizedQuestions[i].row }));

      // prep results object
      const results = csv[0].slice(dataColumnStart).map((characterKey, i) => ({ characterKey, distance: 0, col: dataColumnStart + i }));

      // calc distance squared
      associatedUserAnswers.forEach(({ answer, row }) =>
        results.forEach(result => {
          const charWeight = csv[row][result.col] === '' ? 0.5 : Number(csv[row][result.col]); // TODO: placeholder logic until the matrix is filled out
          return result.distance += ((answer - charWeight) ** 2);
        }));

      // take sqrt & normalize
      const processedResults = results.map(
        ({ characterKey, distance }) =>
          ({
            characterKey,
            similarity: ((1 - (Math.sqrt(distance) / Math.sqrt(results.length))) * 100).toPrecision(4),
          })
      );

      processedResults.sort((a, b) => b.similarity - a.similarity);

      return processedResults;
    }

  }
};

export default app;
