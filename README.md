# bio-data-platform

> A patient-oriented data platform for Wang's Lab at HKUST, Based on Vue.js and Koa2

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

**API**: `/data?type=overview&sequence=0`

**Used Component**: `PatientList.vue`

**Explain**: Fetch the overview table data

**Return Format**: `{ headers: [ { name: string, leadTo: string, sortable: boolean} ], tableData[ [rowData] ]`

**Example**:
```json
  {
     "headers":[
       {
         "name":"ID",
         "leadTo": "patient"
       },
       "SNV Pipeline",
       {
         "name":"Cohort",
         "sortable":true
       }
     ],
     "tableData":[
        [
          "R001",
          "SAVI2",
          "INCB"
        ],
        [
          "R001",
          "SAVI2",
          "INCB"
        ]
     ]
  }
```
