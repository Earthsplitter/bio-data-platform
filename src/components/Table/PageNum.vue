<template>
  <section id="pages">
    <router-link active-class="active-page" class="pageButton" style="width: 42px" to="/list/1">首页</router-link>
    <router-link key="page" active-class="active-page" class="pageButton" v-for="page in pageTag.tags"
                 :to="'/list/'+page">{{page}}
    </router-link>
    <router-link active-class="active-page" class="pageButton" style="width: 42px" :to="'/list/'+pageTag.totalPages">
      末页
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'PageNum',
    props: ['pageTag']
  }
</script>

<style scoped>
  #pages {
    margin: 15px 0;
    display: flex;
    justify-content: center;
  }

  .pageButton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;

    text-decoration: none;
    width: 30px;
    height: 30px;

    border: solid 1px #00bc9b;
    color: #00bc9b;
  }

  .active-page {
    background-color: #00bc9b;
    color: white;
    cursor: not-allowed;
  }
</style>
