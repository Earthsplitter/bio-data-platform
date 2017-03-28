<template>
  <div>
    <!-- Before AJAX loading data, show the loading warnning -->
    <my-table :path="'/patient/'+$route.params.id+'/'+$route.params.category" v-if="data" :rawData="data"></my-table>
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
    beforeRouteUpdate: function (to, from, next) {
      if (to.params.category !== from.params.category) {
        fetch('/data?type=detail&id=' + to.params.id + '&cat=' + to.params.category)
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.data = data
          })
      }
      next()
    },
    beforeMount: function () {
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
