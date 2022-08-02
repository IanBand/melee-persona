<template>


  <div class="container">
    Find out your melee persona by taking this 20 quesion quiz!
    <br />Some questions will have two or three set answers that you must choose from, and some questions will have a slider that you must set in between two ends of a spectrum.
    <br />Click the "Submit" button when you have selected your answer
    <br />Click the "Begin" button to start!
    <br />
    <button @click="begin">Begin</button>
    <br />This app collects no data at all! It was just made for fun.
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {
  },
  data: () => ({
  }),
  props: {},
  computed: {},
  methods: {
    begin(){
      this.$router.replace("/quiz");
    }
  }
};
</script>


<style scoped>

  .container {
    color: white;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

</style>