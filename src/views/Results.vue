<template>
  <div class="container">{{results}}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Results",
  components: {
  },
  data: () => ({
  }),
  props: {},
  computed: {
      ...mapGetters(["results"]),
  },
  methods: {
    ...mapActions(["initQuiz"]),
    reset(){
      this.initQuiz();
      this.$router.push("/quiz");
    }
  }
};
</script>
