<template>
  <tr id="show" v-for="patient in showData.tableData">
    <td v-for="(item, key) in patient">
      <span v-if="showData.headers[key].leadTo">
        <router-link class="link-item" :to="'/patient/'+item">{{item}}</router-link>
      </span>
      <span v-else>
        {{item}}
      </span>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'TableItems',
    props: ['showData'],
    mounted: function () {
    }
  }
</script>

<style>
  .link-item {
    text-decoration: none;
    color: inherit;
    border-bottom: dotted deepskyblue 2px;
  }

  #show:hover {
    background-color: #666 !important;
    color: white;
  }

  #show:nth-child(even) {
    background-color: #f2f2f2
  }
</style>
