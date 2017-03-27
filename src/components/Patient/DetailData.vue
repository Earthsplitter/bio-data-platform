<template>
  <div>
    <!-- Before AJAX loading data, show the loading warnning -->
    <my-table v-if="data" :rawData="data"></my-table>
    <section v-else>
      <p>Loading</p>
    </section>
  </div>
</template>

<script>
  import Table from '../Table/Table.vue'

  export default {
    name: 'DetailData',
    components: {
      'my-table': Table
    },
    data () {
      return {
        data: false
      }
    },
    created: function () {
      fetch('/data?type=detail&id=' + this.$route.params.id + '&cat=' + this.$route.params.category)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.data = data
        })
    }
  }
</script>
