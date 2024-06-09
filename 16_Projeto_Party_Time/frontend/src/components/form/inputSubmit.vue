<template>
  <input type="submit" :value="text">
</template>

<script>
  export default {
    name: "InputSubmit",
    props: {
      text: ""
    }
  }
</script>

<style scoped>
  input {
    width: 200px;
    margin: 0 auto;
    text-transform: uppercase;
    color: #FFF;
    background-color: #25282E;
    border: 0;
    padding: 12px;
    cursor: pointer;
    transition: .5s;
  }

  input:hover {
    background-color: #141619;
  }
</style>