<template>
  <div class="container">
    hello!
    <button @click="begin">begin</button>
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
      this.$router.push("/quiz");
    }
  }
};
</script>


