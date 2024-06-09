<template>
  <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
</template>

<script>
  export default {
    name: "Message",
    props: ["msg", "msgClass"]
  }
</script>

<style scoped>
  .msg {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    border: 1px solid #CCC;
    border-radius: 5px;
  }

  .success {
    color: #155724;
    background-color: #D4EDDA;
    border-color: #C3E6CB;
  }

  .error {
    color: #721C24;
    background-color: #F8D7DA;
    border-color: #F5C6CB;
  }
</style>