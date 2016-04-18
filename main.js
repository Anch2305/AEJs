"use strict"
let jsforce = require('jsforce');
let segments = require('SegmentService.js');

let conn = new jsforce.Connection();
conn.login('anchana.rajamathe@kenandy.com', 'KndyNov15', function(err, res) {
  if (err) { return console.error(err); }
  conn.query('SELECT Id, Name FROM AnchNS__Accounting_Rule__c limit 1', function(err, res) {
    if (err) { return console.error(err); }
    console.log(res);
  });
});
//console.log('segments:'+segments.SegmentService.about());
/*
let segobj = new segments.SegmentService();

//console.log('segments:'+segobj.segments);
for(let segment of segobj.segments){

    console.log('segment:'+segment['Name']);        
    
}
*/

