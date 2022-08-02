<template>
  <div class="container">
    <div>Your melee persona is {{results[0].charTitle}}! they're a {{results[0].similarity}}% match!</div>
    <br />
    <div>{{results[1].charTitle}} was a {{results[1].similarity}}% match</div>
    <br />
    <div>{{results[2].charTitle}} was a {{results[2].similarity}}% match</div>
    <br />
    <button @click="copyResults">
      Copy my results to my keyboard
      <svg
        v-show="!copied"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-clipboard"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
        />
        <path
          fill-rule="evenodd"
          d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
        />
      </svg>
      <svg
        v-show="copied"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        />
      </svg>
    </button>
    <br />
    <button @click="reset">Take this quiz again</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Results",
  components: {
  },
  data: () => ({
    copied: false
  }),
  props: {},
  computed: {
      ...mapGetters(["results"]),
  },
  methods: {
    ...mapActions(["initQuiz"]),
    reset(){
      this.initQuiz();
      this.$router.replace("/quiz");
    },
    copyResults(){
      this.copied = true;
      navigator.clipboard.writeText(
        `My Melee Persona is ${this.results[0].charTitle} @ ${this.results[0].similarity}%
        Find out your Melee Persona: ${'[link-to-melee-persona]'}`
      );
    }
  }
};
</script>
