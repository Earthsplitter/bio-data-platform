<template>
  <section>
    <section id="search-bar">
      <label class="search-label" for="quick">Quick Search: </label>
      <input id="quick" class="search" v-model.trim="quickSearch" placeholder="Search here">
      <span id="advance-toggle" @click="showAdvance">Advance</span>
      <section v-if="advanceShowing" id="advance-group">
        <div v-for="(header, key) in data.headers">
          <label v-if="header.name" class="advance-search-label" :for="key">{{header.name}}: </label>
          <label v-else class="advance-search-label" :for="key">{{header}}: </label>

          <input :id="key" class="advance-search" v-model.trim="advanceModel[key]" placeholder="Exact Match">
        </div>
      </section>
    </section>

    <table-items :sortState="sortState" :sortOrder="sortOrder" :headers="data.headers"
                 :showData="showData" :sort="sort"></table-items>
    <page-num :pageTag="pageTag" :path="path"></page-num>
  </section>
</template>

<script>
  import TableItems from './TableItems.vue'
  import PageNum from './PageNum.vue'

  export default {
    name: 'Table',
    props: ['rawData', 'path'],
    components: {
      'table-items': TableItems,
      'page-num': PageNum
    },
    data () {
      return {
        data: this.rawData,
        // current sort order of each column (initial, direct or inverse)
        sortOrder: [],
        // current mark (fa-sort, caret-up, caret-down)
        sortState: [],

        quickSearch: '',
        advanceShowing: false,
        advanceModel: [],

        itemsPerPage: 20
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
      if (!this.$route.params.page) {
        this.$router.push(this.$router.currentRoute.fullPath + '/1')
      }
      this.data.headers.forEach((element, key) => {
        this.advanceModel[key] = ''
        if (element.sortable === true) {
          this.sortOrder[key] = 'initial'
          this.sortState[key] = 'fa-sort'
        }
      })
    },
    beforeUpdate: function () {
      if (!this.$route.params.page) {
        // if in index, automatically set to page 1
        this.$router.push(this.$router.currentRoute.fullPath + '/1')
      }
      if (this.rawData.headers !== this.data.headers) {
        // if table has been changed, reset this.data from parents' props
        this.data = this.rawData
        this.data.headers.forEach((element, key) => {
          this.advanceModel[key] = ''
          if (element.sortable === true) {
            this.sortOrder[key] = 'initial'
            this.sortState[key] = 'fa-sort'
          }
        })
      }
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
        this.data.tableData.sort((a, b) => {
          let itemA = a[index]
          let itemB = b[index]
          if (this.sortOrder[index]) {
            if (!isNaN(Number(itemA)) && !isNaN(Number(itemB))) {
              // Both is Number
              itemA = Number(itemA)
              itemB = Number(itemB)
            } else if (isNaN(Number(itemA)) && !isNaN(Number(itemB))) {
              // A is String
              return 1
            } else if (!isNaN(Number(itemA)) && isNaN(Number(itemB))) {
              return -1
            }
            if (itemA === itemB) {
              return 0
            } else if (itemA < itemB) {
              return -1
            } else {
              return 1
            }
          } else {
            if (!isNaN(Number(itemA)) && !isNaN(Number(itemB))) {
              // Both is Number
              itemA = Number(itemA)
              itemB = Number(itemB)
            } else if (isNaN(Number(itemA)) && !isNaN(Number(itemB))) {
              // A is String
              return -1
            } else if (!isNaN(Number(itemA)) && isNaN(Number(itemB))) {
              return 1
            }
            if (itemA === itemB) {
              return 0
            } else if (itemA < itemB) {
              return 1
            } else {
              return -1
            }
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

