<template>
  <footer>
    <h3>Party Time &copy; 2024</h3>
    <p>O melhor local para compoartilhar seus eventos!</p>
  </footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  footer{
    background-color: #25282E;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  footer h3 {
    color: #FFF;
    margin-bottom: 15px;
    font-weight: 300;
    font-size: 1.6rem;
  }

  footer p {
    color: #C1B696;
  }

</style>