<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Gerencie seus eventos</h1>
      <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
    </div>
    <div v-if="parties.length > 0">
      <DataTable :parties="parties" />
    </div>
    <div v-else>
      <p>Você ainda não tem festas cadastradas, <router-link to="/newparty">clique aqui para criar a sua
          festa</router-link></p>
    </div>
  </div>
</template>

<script>
  import DataTable from './../components/DataTable.vue'

  export default {
    data() {
      return {
        parties: []
      }
    },
    components: {
      DataTable
    },
    created() {
      // load user parties
      this.getParties();
    },
    methods: {
      async getParties(){
        //get token from store
        const token = this.$store.getters.token;

        await fetch("http://localhost:3000/api/party/userparties", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          }
        })
        .then((resp) => resp.json())
        .then((data) => {
          this.parties = data.parties;
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .dashboard {
    padding: 50px;
    padding-bottom: 100px;
  }

  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 40px;
  }

  .btn {
    padding: 10px 16px;
    background-color: #000;
    color: #FFF;
    margin: 5px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition:  .5s;
    border-radius: 4px;
  }

  .btn:hover {
    background-color: #141619;
  }
</style>