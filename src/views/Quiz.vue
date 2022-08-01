<template>
  <div class="container">
    <div>{{currentQuestionData.questionText}}</div>
    <div v-if="currentQuestionData.type == 'binary'">
      <button
        :class="'btn ' + (selectedValue == 1 ? 'btn-primary' : 'btn-outline-primary')"
        @click="() => selectValue(1.0)"
      >{{currentQuestionData.positivePrompt}}</button>
      <button
        v-if="currentQuestionData.neutralPrompt != ''"
        @click="() => selectValue(0.5)"
        :class="'btn ' + (selectedValue == 0.5 ? 'btn-primary' : 'btn-outline-primary')"
      >{{currentQuestionData.neutralPrompt}}</button>
      <button
        :class="'btn ' + (selectedValue == 0 ? 'btn-primary' : 'btn-outline-primary')"
        @click="() => selectValue(0.0)"
      >{{currentQuestionData.negativePrompt}}</button>
    </div>
    <div v-if="currentQuestionData.type == 'slider'">
      <span>{{currentQuestionData.negativePrompt}}</span>
      <input type="range" min="0" max="1" step="0.01" v-model.number="slider" />
      <span>{{currentQuestionData.positivePrompt}}</span>
    </div>

    <button
      :class="'btn ' + (valueHasBeenSelected ? 'btn-success' : 'btn-secondary')"
      @click="trySubmit"
    >Submit</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const DEFAULT_VALUE = -1;
export default {
  name: "Quiz",
  components: {
  },
  data: () => ({
      valueHasBeenSelected: false,
      selectedValue: DEFAULT_VALUE,
  }),
  props: {},
  computed: {
      ...mapGetters(["currentQuestionData"]),
      slider:{
          get(){return this.valueHasBeenSelected ? this.selectedValue : 0.5;},
          set(value){this.selectValue(value);}
      }
  },
  methods: {
      ...mapActions(["submitValue"]),
      selectValue(value){
          this.selectedValue = value;
          this.valueHasBeenSelected = true;

          console.log(this.selectedValue);
      },
      trySubmit(){
          if(!this.valueHasBeenSelected) return;
          this.submitValue(this.selectedValue);
          this.valueHasBeenSelected = false;
          this.selectedValue = DEFAULT_VALUE;
      }
  }
};
</script>