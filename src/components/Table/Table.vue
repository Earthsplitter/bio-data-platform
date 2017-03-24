<template>
  <section>
    <table-items :sortState="sortState" :sortOrder="sortOrder" :headers="data.headers"
                 :showData="showData" :sort="sort"></table-items>
    <page-num :pageTag="pageTag"></page-num>
  </section>
</template>

<script>
  import TableItems from './TableItems.vue'
  import PageNum from './PageNum.vue'

  export default {
    name: 'Table',
    props: ['rawData'],
    components: {
      'table-items': TableItems,
      'page-num': PageNum
    },
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
          tags.unshift(addingTag)
          addingTag--
          alreadyAdd++
        }
        // Add successor page tag
        addingTag = Number(this.currentPage) + 1
        while (addingTag <= totalPages && alreadyAdd < 4) {
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

</style>

