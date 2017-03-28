/**
 * Created by wenming on 28/03/2017.
 */
let SQLProcessor = require('./SQLProcessor');


module.exports.overview = function (ctx, database) {
  ctx.response.status = 200;
  ctx.response.type = 'application/json';
  return SQLProcessor.queryPatientList(database)
    .then((rawData) => {
      ctx.body = SQLProcessor.processPatientList(rawData)
    });
};

module.exports.patientDetailTabs = function (ctx) {
  ctx.response.status = 200;
  ctx.response.type = 'application/json';
  ctx.body = SQLProcessor.processPatientDetailTabs()
};

module.exports.patientDetail = function (ctx, cat, id, database) {
  ctx.response.status = 200;
  ctx.response.type = 'application/json';
  return SQLProcessor.queryPatientDetails(database, cat, id)
    .then((rawData) => {
      ctx.body = SQLProcessor.processPatientDetail(cat, rawData)
    })
};
