<template>
  <article>
    <h1>Overview</h1>
    <section>
      <table>
        <tr>
          <th v-for="(head, key) in data.headers">
            <!-- do sort when click -->
            <span :id="key" @click="sort($event)" class="sortable-column" v-if="head.sortable">
              {{head.name}} <i :class="'fa ' + sortState[key]"></i>
            </span>
            <span v-else>
              {{head}}
            </span>
          </th>
        </tr>
        <tr id="data" v-for="patient in data.patients">
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
    </section>
  </article>
</template>

<script>
  export default {
    name: 'PatientList',
    data () {
      return {
        // current sort order of each column (initial, direct or inverse)
        sortOrder: ['initial', 'initial'],
        // current mark (fa-sort, caret-up, caret-down)
        sortState: ['fa-sort', 'fa-sort'],
        // core data (table header, data)
        data: {
          headers: [
            {
              name: 'Sample',
              sortable: true,
              leadTo: true
            },
            {
              name: 'Chromosome',
              sortable: true
            }, 'Start', 'End', 'Num_Probes', 'CN', 'Name', 'Segment_Mean'
          ],
          patients: [
            ['R001R', 1, 762097, 48825470, 4601, 'NA', 'CA', 0.106721110874087],
            ['R002R', 2, 48850915, 121310748, 3450, 'NA', 'CA', 0.17297640033504],
            ['R003R', 3, 142540165, 150772262, 328, 'NA', 'CA'],
            ['R001R', 4, 48850915, 121310748, 3450, 'NA', 'CA'], ['R001R', 1, 48850915, 121310748, 3450, 'NA', 'CA'], ['R001R', 1, 48850915, 121310748, 3450, 'NA', 'CA']
          ]
        }
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
        // sort
        this.data.patients.sort((a, b) => {
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
  h1 {
    font-weight: 900;
    font-size: 2.75em;
    line-height: 1.75em;
    margin-bottom: 1em;
    letter-spacing: -0.035em;
  }

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
</style>
