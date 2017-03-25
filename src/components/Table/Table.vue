<template>
  <section>
    <section id="search-bar">
      <label class="search-label" for="quick">Quick Search: </label>
      <input id="quick" class="search" v-model="quickSearch" placeholder="Search here">
      <span id="advance-toggle" @click="showAdvance">Advance</span>
      <section v-if="advanceShowing" id="advance-group">
        <div v-for="(header, key) in data.headers">
          <label v-if="header.name" class="advance-search-label" :for="key">{{header.name}}: </label>
          <label v-else class="advance-search-label" :for="key">{{header}}: </label>

          <input :id="key" class="advance-search" v-model="advanceModel[key]" placeholder="Exact Match">
        </div>
      </section>
    </section>

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

        quickSearch: '',
        advanceShowing: false,
        advanceModel: [],

        itemsPerPage: 10
      }
    },
    computed: {
      pageTag () {
        let tags = []
        let totalPages = Math.ceil(this.filterData.length / this.itemsPerPage)
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
      showData () {
        let start = (this.currentPage - 1) * this.itemsPerPage
        return this.filterData.slice(start, start + this.itemsPerPage)
      },
      filterData () {
        let filterData = this.data.tableData
        if (this.quickSearch !== '') {
          filterData = filterData.filter((item) => {
            return item[0].toLowerCase().includes(this.quickSearch.toLowerCase())
          })
        } else if (this.advanceShowing) {
          // advance search filter
          this.data.headers.forEach((element, key) => {
            filterData = filterData.filter((item) => {
              return !this.advanceModel[key] || item[key].toString().includes(this.advanceModel[key].toString())
            })
          })
        }
        return filterData
      },
      currentPage () {
        return this.$route.params.page || 1
      }
    },
    beforeMount: function () {
      this.data.headers.forEach((element, key) => {
        this.advanceModel[key] = ''
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
      },
      showAdvance () {
        this.quickSearch = ''
        this.advanceShowing = !this.advanceShowing
      }
    }
  }
</script>

<style scoped>
  #search-bar {
    margin: 20px;
  }
  .search-label {
    font-size: 20px;
    margin-right: 15px;
  }
  .search {
    font-size: 20px;
    height: 30px;
    width: 75%;
    margin-top: 10px;
  }
  #advance-toggle {
    display: block;
    height: 40px;
    line-height: 40px;
    width: 80px;

    font-size: 18px;
    color: deepskyblue;
    cursor: pointer;
  }
  .advance-search-label {
    font-size: 14px;
    margin-right: 10px;
  }
  .advance-search {
    font-size: 14px;
    height: 20px;
    width: 75%;
    margin-top: 10px;
  }
</style>

