"use strict"
let jsforce = require('jsforce');
let segments = require('SegmentService.js');
let express = require('express');
let app = express();
let conn = new jsforce.Connection();
//let segwrap = new segments.SegmentService.SegmentDefinitionWrapper();
let segwrapList = [];
let segobj = new segments.SegmentService();

//Load seg wrapper object
//implement comparable.
//assign segments - es generator vs async
//getter for each.
    conn.login('anchana.rajamathe@kenandy.com', 'KndyNov15', function(err, res) {
        if (err) { return console.error(err); }
        //Query custom setting and load segments var in service.
        conn.query('SELECT Id, name,AnchNS__Object_API_Name__c,AnchNS__Segment_Number__c,AnchNS__Accounting_Entry_Field__c,'+
                'AnchNS__Accounting_Rule_Reference_Value__c ,AnchNS__Accounting_Rule_Default__c,AnchNS__Accounting_Rule_Segment__c'+
                ' FROM AnchNS__Segment_Definition__c', function(err, res) {
            if (err) { return console.error(err); }
            console.log(res.records);
            try{
                for (let rec of res.records) {
                    let segwrapobj = new segments.SegmentService.SegmentDefinitionWrapper(rec.Name,rec.AnchNS__Object_API_Name__c,rec.AnchNS__Segment_Number__c,rec.AnchNS__Accounting_Entry_Field__c,rec.AnchNS__Accounting_Rule_Segment__c,rec.AnchNS__Accounting_Rule_Reference_Value__c,rec.AnchNS__Accounting_Rule_Default__c);
                    segwrapList.push(segwrapobj);    
                }
                segobj.segments = segwrapList;
                conn.query('Accounting_Rule',function(err,res){
                    
                });
                
            }catch(err){
             console.log(err);
            }
            console.log('segwrapList');        
            console.log(segwrapList);
            console.log('segment attribute vals in service');        
            console.log(segobj.segments);
        });
        
        //

    });    




app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
//Get 
//console.log('segments:'+segments.SegmentService.about());
/*
let segobj = new segments.SegmentService();

//console.log('segments:'+segobj.segments);
for(let segment of segobj.segments){

    console.log('segment:'+segment['Name']);        
    
}
*/

