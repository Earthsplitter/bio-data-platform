<template>
  <table>
    <tr>
      <th v-for="(head, key) in headers">
        <!-- do sort when click -->
        <span v-if="head.sortable" :id="key" @click="sort($event)" class="sortable-column">
              {{head.name}} <i :class="'fa ' + sortState[key]"></i>
            </span>
        <span v-else>
              {{head}}
          </span>
      </th>
    </tr>

    <tr id="data" v-for="patient in showData">
      <td v-for="(item, key) in patient">
          <span v-if="headers[key].leadTo">
            <router-link class="link-item" :to="'/patient/'+item">{{item}}</router-link>
          </span>
        <span v-else>
            {{item}}
          </span>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: 'TableItems',
    props: ['showData', 'headers', 'sortState', 'sortOrder', 'sort']
  }
</script>

<style scoped>
  table, td {
    border: 1px solid #999;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding-left: 10px;
    height: 40px;
  }

  td {
    height: 40px;
    padding-left: 10px;
  }

  #data:hover {
    background-color: #666 !important;
    color: white;
  }

  #data:nth-child(even) {
    background-color: #f2f2f2
  }

  .sortable-column {
    cursor: pointer;
  }

  .link-item {
    text-decoration: none;
    color: inherit;
    border-bottom: dotted deepskyblue 2px;
  }

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
