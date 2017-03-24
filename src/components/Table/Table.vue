<template>
  <section>
    <table>
      <tr>
        <th v-for="(head, key) in data.headers">
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
          <span v-if="data.headers[key].leadTo">
            <router-link class="link-item" :to="'/patient/'+item">{{item}}</router-link>
          </span>
          <span v-else>
            {{item}}
          </span>
        </td>
      </tr>
    </table>
    <section id="pages">
      <router-link active-class="active-page" class="pageButton" style="width: 42px" to="/list/1">首页</router-link>
      <router-link active-class="active-page" class="pageButton" v-for="page in pageTag.tags" :to="'/list/'+page">{{page}}</router-link>
      <router-link active-class="active-page" class="pageButton" style="width: 42px" :to="'/list/'+pageTag.totalPages">末页</router-link>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'Table',
    props: ['rawData'],
    data () {
      return {
        // sorted data for table
        data: this.rawData,
        // current sort order of each column (initial, direct or inverse)
        sortOrder: [],
        // current mark (fa-sort, caret-up, caret-down)
        sortState: [],

        itemsPerPage: 1
      }
    },
    computed: {
      pageTag () {
        let tags = []
        let totalPages = Math.floor(this.data.tableData.length / this.itemsPerPage)
        tags.push(this.currentPage)
        let addingTag = this.currentPage - 1
        let alreadyAdd = 0
        // Add leading page tag
        while (addingTag > 0 && alreadyAdd < 2) {
          console.log(addingTag)
          tags.unshift(addingTag)
          addingTag--
          alreadyAdd++
        }
        // Add successor page tag
        addingTag = Number(this.currentPage) + 1
        while (addingTag <= totalPages && alreadyAdd < 4) {
          console.log(addingTag)
          tags.push(addingTag)
          addingTag++
          alreadyAdd++
        }

        return {
          totalPages: totalPages,
          tags: tags
        }
      },
      totalPages () {
        return Math.floor(this.data.tableData.length / this.itemsPerPage)
      },
      showData () {
        let start = (this.currentPage - 1) * this.itemsPerPage
        return this.data.tableData.slice(start, start + this.itemsPerPage)
      },
      currentPage () {
        return this.$route.params.page || 1
      }
    },
    beforeMount: function () {
      this.data.headers.forEach((element, key) => {
        if (element.sortable === true) {
          this.sortOrder[key] = 'initial'
          this.sortState[key] = 'fa-sort'
        }
      })
    },
    methods: {
      sort (event) {
        // index: sort according which column
        let index = event.target.id
        // change sort direction
        this.sortOrder[index] = this.sortOrder[index] === 'initial' ? true : !this.sortOrder[index]
        // restore all mark to 'fa-sort'
        this.sortState = this.sortState.map((element) => {
          return 'fa-sort'
        })
        // change current column icon
        this.sortState[index] = this.sortOrder[index] === true ? 'fa-caret-up' : 'fa-caret-down'
        // sort
        this.data.tableData.sort((a, b) => {
          if (this.sortOrder[index]) {
            return a[index] < b[index]
          } else {
            return b[index] < a[index]
          }
        })
      }
    }
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
  #pages {
    margin-top: 15px;
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
  }
</style>

