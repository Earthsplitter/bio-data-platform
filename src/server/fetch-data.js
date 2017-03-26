/**
 * Created by hongyushi on 3/25/17.
 */
let SQLserver = function(){
  let mysql = require('mysql');
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'S08302500455',
    database: 'bio_platform'
  });
  return connection;
}


let SQLquery = function (connection, query){
  return new Promise(function (resolve, reject){
    connection.query(query, function(error, results){
      if (error) reject(error);
      resolve(results);
    });
  });
};

let fetch_patient_list = function(data){
  let header_array = [
    {
      "name": "Patient ID",
      "leadTo": true
    },
    "SNV Pipeline",
    {
      "name": "Cohort",
      "sortable": true
    },
    "Treatment",
    {
      "name": "Hypermutation",
      "sortable": true
    },
    "Surgical Interval",
    {
      "name": "Overall Survival",
      "sortable": true
    },
    {
      "name": "Age",
      "sortable": true
    }
  ];

  let output = {};
  output.headers = header_array;
  output.tableData = [];
  data.forEach(function(element){
    let newelement = [element.patient_id, element.snv_pipeline, element.cohort, element.treatment,
      element.hypermutation, element.surgical_interval, element.overall_survival, element.age];
    output.tableData.push(newelement);
  });
  console.log(JSON.stringify(output));
  return output;
};

module.exports = {SQLserver, SQLquery, fetch_patient_list};


