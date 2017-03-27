# bio-data-platform

> A patient-oriented data platform for Wang's Lab at HKUST, Based on Vue.js and Koa2
Here is the [demo](http://139.199.228.109:8080)

## Build Setup

``` bash
# clone or Download this project

# install dependencies
npm install

# set up database with mysql
wait for finish

# build for production with minification
npm run build

# run server in the root directory
node src/server/server.js

# visit page on localhost:8080
```

## Rest API

### Overview Table Data


*  API: `/data?type=overview&sequence=0`
*  Fetching Component: `PatientList.vue`
*  Digest Component: `Table.vue`
*  Explain: Fetch the overview table data
*  Return Format: `{ headers: [{ name: string, leadTo: string, sortable: boolean}], tableData: [[rowData]] }`
*  Example:
<span id="TableData"/>
```json
  {
     "headers":[
       { "name":"ID",
         "leadTo": "patient"
       },
       "SNV Pipeline",
       { "name":"Cohort",
         "sortable":true
       }
     ],
     "tableData":[
        [ "R001",
          "SAVI2",
          "INCB"],
        [ "R001",
          "SAVI2",
          "INCB"]
     ]
  }
```

### Patient Detail Tabs

*  API: `/data?type=detailTabs`
*  Fetching Component: `PatientDetail.vue`
*  Digest Component: `TabsSwitch.vue`
*  Explain: Fetch how many tabs in Patient Detail and their names
*  Return Format: `[name: String]`
*  Example:
```json
["AAA", "BBB", "CCC", "DDD", "EEE"]
```

### Patient Detail Table

*  API: `/data?type=detail&cat=` + `tabName`(must the same as tab name in `Patient Detail Tabs`)
*  Fetching Component: `DetailData.vue`
*  Digest Component: `Table.vue`
*  Explain: Fetch corresponding table data in detail tabs
*  Return Format: `{ headers: [ { name: string, leadTo: string, sortable: boolean} ], tableData: [[rowData]] }`
*  Example: [As other table data](#TableData)
