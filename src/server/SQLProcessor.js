/**
 * Created by hongyushi on 3/25/17.
 */
let SQLCreate = function () {
  let mysql = require('mysql');
  let fs = require('fs');
  return new Promise(function (resolve, reject) {
    fs.readFile(__dirname + '/SQLConfig.json', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(mysql.createConnection(JSON.parse(data)));
    })
  });
};

//get patient list from Table clinic
let queryPatientList = function (connection) {
  return new Promise(function (resolve, reject) {
    connection.query('select patient_id, snv_pipeline, cohort, treatment, hypermutation, age from clinic',
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
  });
};

//get patient detail table from DB
let queryPatientDetails = function (connection, category, PatientID) {
  let sql = '';
  switch (category) {
    case 'Somatic Mutation':
      sql = 'select gene_name, chromosome, position, vaf_initial, vaf_recurrent from mutation where patient_id="' + PatientID + '"';
      break;
    case 'Recurrent Tumor CNV':
      sql = 'select chromosome, start_position, end_position, num_probes, segment_mean from cnv where patient_id="' + PatientID + '"';
      break;
    default:
      sql = 'select * from clinic where patient_id=' + PatientID;
  }
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (error, results) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

let processTableData = function (data) {
  let tableData = [];
  let tableKeys = Object.keys(data[0]);
  data.forEach(function (element) {
    let newElement = [];
    tableKeys.forEach(function (key) {
      newElement.push(element[key]);
    });
    tableData.push(newElement);
  });
  return tableData;
};

//process patient list raw data into json
let processPatientList = function (data) {
  let headerArray = [
    {
      'name': 'Patient',
      'leadTo': 'patient'
    },
    'SNV Pipeline',
    {
      'name': 'Cohort',
      'sortable': true
    },
    'Treatment',
    {
      'name': 'Hypermutation',
      'sortable': true
    },
    {
      'name': 'Age',
      'sortable': true
    }
  ];

  let output = {};
  output.headers = headerArray;

  //generate table data
  output.tableData = processTableData(data);
  return JSON.stringify(output);
};

let processPatientDetailTabs = function () {
  let tab = ['Somatic Mutation', 'Recurrent Tumor CNV'];
  return JSON.stringify(tab);
};

let processPatientDetail = function (category, data) {
  let headerArray;
  switch (category) {
    case 'Somatic Mutation':
      headerArray = [
        {
          'name': 'Gene',
          'sortable': true
        },
        {
          'name': 'Chromosome',
          'sortable': true
        },
        'Position',
        'VAF_Initial',
        'VAF_Recurrent'
      ];
      break;
    case 'Recurrent Tumor CNV':
      headerArray = [
        {
          'name': 'Chromosome',
          'sortable': true
        },
        'Start Position',
        'End Position',
        'Number of probes',
        {
          'name': 'Segment Mean',
          'sortable': true
        }
      ];
      break;
    default:
      headerArray = [];
  }
  let output = {};
  output.headers = headerArray;
  output.tableData = processTableData(data);
  return JSON.stringify(output);
};

module.exports = {
  SQLCreate: SQLCreate,
  queryPatientList: queryPatientList,
  queryPatientDetails: queryPatientDetails,
  processPatientList: processPatientList,
  processPatientDetailTabs: processPatientDetailTabs,
  processPatientDetail: processPatientDetail
};
