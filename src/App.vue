<template>
  <router-view />
</template>

<script>
import {mapActions } from "vuex";

export default {
  name: "App",
  mounted(){
    this.initQuiz();
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions(["initQuiz"]),
  }
};
</script>
