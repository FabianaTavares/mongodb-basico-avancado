<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form id="login-form" @submit="login($event)">
      <div class="input-container">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email" v-model="email" placeholder="Digite seu email">
      </div>
      <div class="input-container">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" v-model="password" placeholder="Digite sua senha">
      </div>
      <InputSubmit text="Entrar" />
    </form>
  </div>
</template>

<script>
  import InputSubmit from './form/inputSubmit.vue'
  import Message from './Message.vue'

  export default {
    name: "LoginForm",
    data() {
      return {
        email: null,
        password: null,
        msg: null,
        msgClass: null
      }
    },
    props: ["user", "page", "btnText"],
    components: {
      InputSubmit,
      Message
    },
    methods: {
      async login(e) {
        e.preventDefault();

        const data = {
          "email": this.email,
          "password": this.password
        };

        const jsonData = JSON.stringify(data);

        await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: jsonData
        })
        .then((resp) => resp.json())
        .then((data) => {

          let auth = false;

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            auth = true;
            this.msg = data.msg;
            this.msgClass = "success";

            // emit event for auth an user
            this.$store.commit("authenticate", { token: data.token, userId: data.userId })
          }

          setTimeout(() => {
            if (!auth) {
              this.msg = null
            } else {
              // redirect
              this.$router.push("dashboard");
            }
          }, 2000);

        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }

</script>

<style scoped>
  #login-form {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    text-align: left;
  }

  .input-container label {
    margin-bottom: 10px;
    color: #555;
  }

  .input-container input {
    padding: 10px;
    border: 1px solid #e8e8e8;
  }
</style>