<template>
  <div class="register">
    <h1>Criar conta</h1>
    <UserForm :user="{}" page="register" btnText="Cadastrar"/>
  </div>
</template>

<script>
  import UserForm from './../components/UserForm.vue'
  export default {
    name: "Register",
    components: {
      UserForm
    }
  }
</script>

<style scoped>
  .register {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
  }

  .register h1 {
    margin-bottom: 40px;
  }
</style>