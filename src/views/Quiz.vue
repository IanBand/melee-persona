<template>
  <div class="container">
    Quiz
    <button @click="trySubmit">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Quiz",
  components: {
  },
  data: () => ({
      valueSelected: false,
      heldValue: 0.5,
  }),
  props: {},
  computed: {
      ...mapGetters(["currentQuestionData"]),
  },
  methods: {
      ...mapActions(["submitValue"]),
      trySubmit(){
          if(!this.valueSelected) return;
          this.submitValue(this.heldValue);
          this.valueSelected = false;
      }
  }
};
</script>
