<template>
  <article>
    <h1>Patient {{$route.params.id}} Details</h1>

    <section id="tabs-group">
      <router-link v-for="tab in tabs" class="tab" :to="'/patient/'+$route.params.id+'/'+tab">{{tab}}</router-link>
    </section>

    <router-view></router-view>
  </article>
</template>

<script>
  export default {
    name: 'PatientDetail',
    data () {
      return {
        tabs: []
      }
    },
    beforeMount: function () {
      fetch('/data?type=detailTabs&sequence=0')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.tabs = data
        })
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: 900;
    font-size: 2.75em;
    line-height: 1.75em;
    margin-bottom: 1em;
    letter-spacing: -0.035em;
  }
  #tabs-group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .tab {
    height: 70px;
    border-radius: 30px;
    width: 180px;
    margin: 10px 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    background-color: #00bc9b;
    color: white;

    text-decoration: none;
  }
</style>
