<template>
  <article>
    <h1>Patient {{$route.params.id}} Details</h1>
    <tabs-switch :tabs="tabs" :path="'/patient/'+$route.params.id+'/'"></tabs-switch>
    <router-view></router-view>

    <data-select :tags="navTags"></data-select>
  </article>
</template>

<script>
  import TabsSwitch from '../Utilities/TabsSwitch.vue'
  import DataSelect from '../Utilities/DataSelect.vue'

  export default {
    name: 'PatientDetail',
    components: {
      'tabs-switch': TabsSwitch,
      'data-select': DataSelect
    },
    data () {
      return {
        tabs: [],
        navTags: [{
          name: 'Overview',
          address: '/list'
        }]
      }
    },
    created: function () {
      fetch('/data?type=detailTabs&id=' + this.$route.params.id)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.tabs = data
          this.$router.push('/patient/' + this.$route.params.id + '/' + this.tabs[0] + '/1')
          data.forEach((element) => {
            this.navTags.push({
              name: element,
              address: '/patient/' + this.$route.params.id + '/' + element
            })
          })
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
</style>
