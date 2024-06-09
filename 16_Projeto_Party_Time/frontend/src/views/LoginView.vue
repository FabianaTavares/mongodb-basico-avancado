<template>
  <div class="login">
    <h1>Entrar no Party Time</h1>
    <LoginForm />
  </div>
</template>

<script>
  import LoginForm from './../components/LoginForm.vue';
  export default {
    components: {
      LoginForm
    }
  }
</script>

<style scoped>
  .login {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
  }

  .login h1 {
    padding-bottom: 40px;
  }

</style>