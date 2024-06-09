<template>
  <div class="data-container">
    <Message :msg="msg" :msgClass="msgClass" />
    <div class="data-table-heading">
      <div class="data-id-heading">N</div>
      <div class="data-title-heading">Nome da Festa</div>
      <div class="data-actions-heading">Ações</div>
    </div>
    <div class="data-table-body">
      <div class="data-row" v-for="(party, index) in parties" :key="index">
        <div class="data-id-container">{{ index + 1 }}</div>
        <div class="data-title-container">
          <router-link :to="`/party/${party._id}`">{{party.title}}</router-link>
        </div>
        <div class="data-actions-container">
          <router-link :to="`/editparty/${party._id}`" class="edit-btn">Editar</router-link>
          <button class="remove-btn" @click="remove(party._id)">Remover</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: "DataTable",
  props: ["parties"],
  components: {
    Message
  },
  data() {
    return {
      msg: null,
      msgClass: null,
    }
  },
  methods: {
    async remove(id){

      const userId = this.$store.getters.userId;
      const token = this.$store.getters.token;

      const data = {
        id: id,
        userId: userId
      }

      const jsonData = JSON.stringify(data);

      await fetch("http://localhost:3000/api/party", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: jsonData
      })
      .then((resp) => resp.json())
      .then((data) => {

        if (data.error) {
          this.msg = data.error;
          this.msgClass = "error";
        } else {
          this.msg = data.msg;
          this.msgClass = "success";
        }

        setTimeout(() => {
          this.msg = null
          this.$parent.getParties();
        }, 1000);

      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .data-table-heading, .data-row {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
  }

  .data-table-heading div, .data-row div {
    flex: 1 1 0;
  }

  .data-id-heading, .data-id-container {
    max-width: 50px;
  }

  .edit-btn, .remove-btn {
    padding: 10px 16px;
    background-color: #000;
    color: #FFF;
    margin: 5px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: .5s;
    border-radius: 4px;
    height: 40px;
  }

  .edit-btn {
    background-color: #007BFF;
  }

  .edit-btn:hover {
    background-color: #0069D9;
  }

  .remove-btn {
    background-color: #DC3545;
  }

  .remove-btn:hover {
    background-color: #C82333;
  }

</style>