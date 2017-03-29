<template>
  <section id="tabs-group">
    <router-link active-class="active-tab" v-for="tab in tabs" class="tab" :to="path+tab">{{tab}}</router-link>
    <hr>
  </section>
</template>

<script>
  export default {
    name: 'TabsSwitch',
    props: ['tabs', 'path']
  }
</script>

<style scoped>
  #tabs-group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .tab {
    height: 70px;
    border-radius: 30px;
    width: 230px;
    margin: 10px 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    background-color: white;
    border: solid 1px #00bc9b;
    color: #00bc9b;

    text-decoration: none;
  }
  hr {
    width: 100%;
    border: solid 1px #00bc9b;
  }
  .active-tab {
    background-color: #00bc9b;
    color: white;
  }
</style>
