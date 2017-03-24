<template>
  <article>
    <h1>Overview</h1>
    <section v-if="data">
      <my-table :rawData="data"></my-table>
    </section>
    <section v-else>
      <p>Loading</p>
    </section>
  </article>
</template>

<script>
  import Table from './Table.vue'

  export default {
    name: 'PatientList',
    created: function () {
      fetch('/data?type=overview&sequence=0')
        .then(response => response.json())
        .then(object => {
          this.data = object
        })
    },
    data () {
      return {
        // core data (table header, data)
        // fetch from server
        data: false
      }
    },
    components: {
      'my-table': Table
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
</style>
