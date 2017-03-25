<template>
  <article>
    <h1>Overview</h1>
    <!-- Before AJAX loading data, show the loading warnning -->
    <my-table v-if="data" :rawData="data"></my-table>
    <section v-else>
      <p>Loading</p>
    </section>

    <data-select :tags="navTags"></data-select>
  </article>
</template>

<script>
  import Table from './Table/Table.vue'
  import DataSelect from './Fixed/DataSelect.vue'

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
        data: false,
        navTags: [{
          name: 'Overview',
          address: '/list'
        }
        ]
      }
    },
    components: {
      'my-table': Table,
      'data-select': DataSelect
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
