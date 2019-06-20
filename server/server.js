var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var sql = require("mssql");
var testMode = true;
app.use(bodyParser.json())

// config for your database

var config = {
    user: 'Developer',
    password: 'D3v3l0p3r!',
    server: 'SCWPSQL01.stowe.local',
    database: 'CCStatistics',
    port: 1433
};

let groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
    }, {});
};
//Function to connect to database and execute query
var  executeQuery = function(response, query){  
    sql.close();           
    sql.connect(config, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    response.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, result) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     response = {
                                        "recordsets": [
                                            
                                                {
                                                    "HourPeriod": "00",
                                                    "Calls": 0
                                                },
                                            ]
                                    }
                                    response.send(result);
                                    }
                                    else
                                    {
                                        response.send({ data: result });
                                    }
                              });
                      }
     });           
}



function safe(action, defaultResult) {
    try {
        var result = action();
        return !_1.isUndefined(result) ? result : defaultResult;
    }
    catch (e) {
        if (e.name === "TypeError" || e.name === "ReferenceError") {
            return defaultResult;
        }
        throw e;
    }
}

async function getHeaderData() {
    let incoming = null;
    let inQue = null;
    let noAnswer = null;
    let longestWaitTime = null;
    let outgoing = null;
    let abandoned = null;
    let headerDataSet = null;

    console.log('running:::>');
    let res = null;
    var sql = require("mssql");

    sql.close();

    // connect to your database
    sql.connect(config).then(function (err) {
        console.log('connected');
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();


        let current_datetime = new Date();
        let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate();
        //console.log(formatted_date)

        let noAnswer = "select SUM(ac_ring_no_answer) as Ring_No_Answer from Agent_Calls_Details where AC_Date = '" + formatted_date + "' and AC_Agent_Code <> 0";
        // console.log('noAnswer', noAnswer)

        // header queries
        let Incoming = "Select Incomming as Incomming from Call_Stage";
        let inQue = "Select In_Que from Call_Stage";
        let longest_Wait_Time = "Select longest_Wait_Time from Call_Stage";
        let outgoing = 'Select Outgoing_Calls as Outgoing from Call_Stage';

        let agentQueStats = 'Select Agent.A_Name, Queue_Groups.Q_Name, Agent.A_Status,AC_Ring_No_Answer as Ring_No_Answer, AC_Taken as Answered_Calls,AC_OutBound as OutBound_Calls, (AC_Taken + AC_OutBound) as [All_Calls] from Agent_Calls_Details, Queue_Groups, (Select cd_Agent_Code, SUM (OutBound_Calls) OutBound_Calls,COUNT(cd_Agent_Code) AllCalls FROM (Select cd_Agent_Code, ' +
            'case when CD_Outbound = 1 then CD_Outbound else  0 end as [OutBound_Calls] ' +
            'from Call_Details ' +
            "where CD_Date = '" + formatted_date +
            "') Y " +
            'Group by cd_Agent_Code ' +
            ') x, Agent ' +
            'Where x.cd_Agent_Code = Agent_Calls_Details.AC_Agent_Code ' +
            'and Agent.A_Group = Queue_Groups.Q_Code and ' +
            "Agent_Calls_Details.Ac_date = '" + formatted_date + "' and " +
            'agent.A_Code = x.CD_Agent_Code ' +
            'order by Q_Name asc ';

        

        

        request.query(abandonedSql, function (err, recordset) {
            abandoned = recordset;
        });

        request.query(noAnswer, function (err, recordset) {
            noAnswer = recordset;
        });

        //console.log(Incomming);
        request.query(Incoming, function (err, recordset) {
            console.log('incoming : > ', JSON.stringify(recordset, null, 4));
            incoming = recordset.recordset[0].Incomming;
        }.then);

        //console.log(inQue);
        request.query(inQue, function (err, recordset) {
            inQue = recordset;
        });

        //console.log(longest_Wait_Time);
        request.query(longest_Wait_Time, function (err, recordset) {
            longestWaitTime = recordset;
        });

        //console.log(outgoing);
        request.query(outgoing, function (err, recordset) {
            outgoing = recordset;
        });

        //console.log('agentQueStats string::>  ',agentQueStats);
        // request.query(agentQueStats, function (err, recordset) {
        //     // if (err) console.log(err)

        //     // send records as a response
        //     res = recordset;
        //     // fs.appendFile('dataset.txt', 'sql::: >' + JSON.stringify(agentQueStats, null, 4), function (err) {
        //     //   //  if (err) throw err;
        //     //     console.log('Saved!');
        //     // });
        //     // fs.appendFile('dataset.txt', 'agentQueStats::: >' + JSON.stringify(res, null, 4), function (err) {
        //     //     if (err) throw err;
        //     //     console.log('Saved!');
        //     // });
        // });


        // request.query(callsPerhour, function (err, recordset) {
        //     //if (err) console.log(err)

        //     // send records as a response
        //     res = recordset;
        //     // fs.appendFile('dataset.txt', ' callsPerhour sql::: >' + JSON.stringify(callsPerhour, null, 4), function (err) {
        //     //     // if (err) throw err;
        //     //     console.log('Saved!');
        //     // });
        //     // fs.appendFile('dataset.txt', 'callsPerhour::: >' + JSON.stringify(res, null, 4), function (err) {
        //     //     // if (err) throw err;
        //     //     console.log('Saved!');
        //     // });
        // });


        // request.query(avgRingTime, function (err, recordset) {
        //     //if (err) console.log(err)

        //     // send records as a response
        //     res = recordset;
        //     // fs.appendFile('dataset.txt', 'sql::: >' + JSON.stringify(avgRingTime, null, 4), function (err) {
        //     //     if (err) throw err;
        //     // });
        //     // console.log('avgRingTime::: >', JSON.stringify(res, null, 4));
        //     // fs.appendFile('dataset.txt', 'avgRingTime::: >' + JSON.stringify(res, null, 4), function (err) {
        //     //     if (err) throw err;
        //     //     console.log('Saved!');
        //     // });
        // });
        const headerData = {
            incoming: safe(() => incoming.recordset[0].Incomming, null),
            inQue: safe(() => inQue.recordset[0].In_Que, null),
            longestWaitTime: safe(() => longestWaitTime.recordset[0].longest_Wait_Time, null),
            outgoing: safe(() => outgoing.recordset[0].Outgoing, null),
            noAnswer: safe(() => noAnswer.recordset[0].Ring_No_Answer, null),
            abandoned: safe(() => abandoned.recordset[0].Abandoned, null),
        }
        headerDataSet = headerData;
        console.log('headerData::::>', headerData);

    });


    return headerDataSet;
    // return headerData;
};


// function getHourlyData() {
//     if(!testMode){
//     var sql = require("mssql");

//     // config for your database
//     var config = {
//         user: 'Developer',
//         password: 'D3v3l0p3r!',
//         server: 'SCWPSQL01.stowe.local',
//         database: 'CCStatistics',
//         port: 1433
//     };

//     let avgCallsPerHour = "Select Agent.A_Name, Queue_Groups.Q_Name, " +
//         'Agent.A_Status, AC_Ring_No_Answer as Ring_No_Answer, ' +
//         'AC_Taken as Answered_Calls, AC_Outbound as OutBound_Calls, ' +
//         '(AC_Taken+AC_Outbound) as [All_Calls] ' +
//         'from Agent_Calls_Details, Queue_Groups, Agent ' +
//         'Where Agent.A_Group = Queue_Groups.Q_Code and ' +
//         "Agent_Calls_Details.AC_Date = '" + formatted_date + "' " +
//         'and agent.A_Code = AC_Agent_Code order by Q_Name asc';

//     let avgRingTime = 'select HourPeriod, ' +
//         "datepart(second,DATEADD(MS,Avg(datediff(ms,'00:00:00.000', CD_Ring_Time)),'00:00:00.000')) as [Total] " +
//         'from HourPeriods ' +
//         'Left Join Call_details on ' +
//         "(Datepart(Hour,CD_Time_Of_Call) = HourVal) and cd_date = '" + formatted_date + "'  " +
//         'group by HourPeriod';

//     // connect to your database
//     sql.connect(config, function (err) {

//         request.query(avgCallsPerHour, function (err, recordset) {
//             if (err) console.log(err)

//             // send records as a response
//             agentCallsPerHour = recordset;
//             // fs.appendFile('dataset.txt', 'sql::: >' + JSON.stringify(avgCallsPerHour, null, 4), function (err) {
//             //     if (err) throw err;
//             // });

//             // fs.appendFile('dataset.txt', 'avgCallsPerHour::: >' + JSON.stringify(res, null, 4), function (err) {
//             //     if (err) throw err;
//             //     console.log('Saved!');
//             // });
//         });

//         request.query(avgRingTime, function (err, recordset) {
//             if (err) console.log(err)

//             // send records as a response
//             avgRingTime = recordset;
//             // fs.appendFile('dataset.txt', 'sql::: >' + JSON.stringify(avgRingTime, null, 4), function (err) {
//             //     if (err) throw err;
//             // });
//             // console.log('avgRingTime::: >', JSON.stringify(res, null, 4));
//             // fs.appendFile('dataset.txt', 'avgRingTime::: >' + JSON.stringify(res, null, 4), function (err) {
//             //     if (err) throw err;
//             //     console.log('Saved!');
//             // });
//         });
//     });

//     sql.close();

//     const agentCallData = {
//         agentCallsPerHour: agentCallsPerHour.recordset,
//         avgRingTime: avgRingTime.recordset,
//     };

//     return agentCallData;
// }else{
//     let callsPerHour = {
//         "recordsets": [
//             [
//                 {
//                     "HourPeriod": "00",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "01",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "02",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "03",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "04",
//                     "Calls": 3
//                 },
//                 {
//                     "HourPeriod": "05",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "06",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "07",
//                     "Calls": 21
//                 },
//                 {
//                     "HourPeriod": "08",
//                     "Calls": 49
//                 },
//                 {
//                     "HourPeriod": "09",
//                     "Calls": 60
//                 },
//                 {
//                     "HourPeriod": "10",
//                     "Calls": 76
//                 },
//                 {
//                     "HourPeriod": "11",
//                     "Calls": 64
//                 },
//                 {
//                     "HourPeriod": "12",
//                     "Calls": 71
//                 },
//                 {
//                     "HourPeriod": "13",
//                     "Calls": 32
//                 },
//                 {
//                     "HourPeriod": "14",
//                     "Calls": 33
//                 },
//                 {
//                     "HourPeriod": "15",
//                     "Calls": 20
//                 },
//                 {
//                     "HourPeriod": "16",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "17",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "18",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "19",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "20",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "21",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "22",
//                     "Calls": 0
//                 },
//                 {
//                     "HourPeriod": "23",
//                     "Calls": 0
//                 }
//             ]
//         ],
//         "recordset": [
//             {
//                 "HourPeriod": "00",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "01",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "02",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "03",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "04",
//                 "Calls": 3
//             },
//             {
//                 "HourPeriod": "05",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "06",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "07",
//                 "Calls": 21
//             },
//             {
//                 "HourPeriod": "08",
//                 "Calls": 49
//             },
//             {
//                 "HourPeriod": "09",
//                 "Calls": 60
//             },
//             {
//                 "HourPeriod": "10",
//                 "Calls": 76
//             },
//             {
//                 "HourPeriod": "11",
//                 "Calls": 64
//             },
//             {
//                 "HourPeriod": "12",
//                 "Calls": 71
//             },
//             {
//                 "HourPeriod": "13",
//                 "Calls": 32
//             },
//             {
//                 "HourPeriod": "14",
//                 "Calls": 33
//             },
//             {
//                 "HourPeriod": "15",
//                 "Calls": 20
//             },
//             {
//                 "HourPeriod": "16",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "17",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "18",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "19",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "20",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "21",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "22",
//                 "Calls": 0
//             },
//             {
//                 "HourPeriod": "23",
//                 "Calls": 0
//             }
//         ],
//         "output": {},
//         "rowsAffected": [
//             24
//         ]
//     }

//     let avgRingtimePerHour = {
//         "recordsets": [
//             [
//                 {
//                     "HourPeriod": "00",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "01",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "02",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "03",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "04",
//                     "Total": 27
//                 },
//                 {
//                     "HourPeriod": "05",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "06",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "07",
//                     "Total": 7
//                 },
//                 {
//                     "HourPeriod": "08",
//                     "Total": 10
//                 },
//                 {
//                     "HourPeriod": "09",
//                     "Total": 11
//                 },
//                 {
//                     "HourPeriod": "10",
//                     "Total": 13
//                 },
//                 {
//                     "HourPeriod": "11",
//                     "Total": 10
//                 },
//                 {
//                     "HourPeriod": "12",
//                     "Total": 11
//                 },
//                 {
//                     "HourPeriod": "13",
//                     "Total": 7
//                 },
//                 {
//                     "HourPeriod": "14",
//                     "Total": 12
//                 },
//                 {
//                     "HourPeriod": "15",
//                     "Total": 12
//                 },
//                 {
//                     "HourPeriod": "16",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "17",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "18",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "19",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "20",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "21",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "22",
//                     "Total": null
//                 },
//                 {
//                     "HourPeriod": "23",
//                     "Total": null
//                 }
//             ]
//         ],
//         "recordset": [
//             {
//                 "HourPeriod": "00",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "01",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "02",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "03",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "04",
//                 "Total": 27
//             },
//             {
//                 "HourPeriod": "05",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "06",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "07",
//                 "Total": 7
//             },
//             {
//                 "HourPeriod": "08",
//                 "Total": 10
//             },
//             {
//                 "HourPeriod": "09",
//                 "Total": 11
//             },
//             {
//                 "HourPeriod": "10",
//                 "Total": 13
//             },
//             {
//                 "HourPeriod": "11",
//                 "Total": 10
//             },
//             {
//                 "HourPeriod": "12",
//                 "Total": 11
//             },
//             {
//                 "HourPeriod": "13",
//                 "Total": 7
//             },
//             {
//                 "HourPeriod": "14",
//                 "Total": 12
//             },
//             {
//                 "HourPeriod": "15",
//                 "Total": 12
//             },
//             {
//                 "HourPeriod": "16",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "17",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "18",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "19",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "20",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "21",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "22",
//                 "Total": null
//             },
//             {
//                 "HourPeriod": "23",
//                 "Total": null
//             }
//         ],
//         "output": {},
//         "rowsAffected": [
//             24
//         ]
//     }

//     let returnData = {
//         agentCallsPerHour: callsPerHour.recordset,
//         avgRingTime: avgRingtimePerHour.recordset,
//     }
//     console.log('retrn', returnData);
//     return returnData;
// }
// }

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/api/getHeaderData', async function (req, res) {
    //get incoming , ring no answer abandoned outgoing
   // const dataset = await getHeaderData();

    // console.log('dataset : > ', dataset);
    // res.setHeader('Content-Type', 'application/json');
    // res.send({ data: dataset });
});


function getAgentData(){
    var dataset
if(!testMode){
   
}else{
    dataset  = {
        "recordsets": [
            [
                {
                    "A_Name": "Meagan Adams",
                    "Q_Name": "NetPOS",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 3,
                    "OutBound_Calls": 11,
                    "All_Calls": 14
                },
                {
                    "A_Name": "Shea Slinger",
                    "Q_Name": "NetPOS",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 4,
                    "OutBound_Calls": 19,
                    "All_Calls": 23
                },
                {
                    "A_Name": "Curwyn Robertson",
                    "Q_Name": "NetPOS",
                    "A_Status": "Technical Assistance",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 4,
                    "OutBound_Calls": 23,
                    "All_Calls": 27
                },
                {
                    "A_Name": "Damsley Jacobs",
                    "Q_Name": "NetPOS",
                    "A_Status": "Technical Assistance",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 0,
                    "OutBound_Calls": 8,
                    "All_Calls": 8
                },
                {
                    "A_Name": "Snazo Qwesha",
                    "Q_Name": "NetPOS",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 3,
                    "OutBound_Calls": 22,
                    "All_Calls": 25
                },
                {
                    "A_Name": "Mfanelo Ngcokovane",
                    "Q_Name": "NetPOS",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 1,
                    "OutBound_Calls": 8,
                    "All_Calls": 9
                },
                {
                    "A_Name": "Imraan Abrahams ",
                    "Q_Name": "NetPOS",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 4,
                    "OutBound_Calls": 6,
                    "All_Calls": 10
                },
                {
                    "A_Name": "Nicholas Arendse",
                    "Q_Name": "NetPOS",
                    "A_Status": null,
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 2,
                    "OutBound_Calls": 14,
                    "All_Calls": 16
                },
                {
                    "A_Name": "Dillon Davids",
                    "Q_Name": "PEC & Namos",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 10,
                    "OutBound_Calls": 27,
                    "All_Calls": 37
                },
                {
                    "A_Name": "Angela Hitchcock",
                    "Q_Name": "PEC & Namos",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 0,
                    "OutBound_Calls": 5,
                    "All_Calls": 5
                },
                {
                    "A_Name": "Lona Deli",
                    "Q_Name": "PEC & Namos",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 4,
                    "OutBound_Calls": 19,
                    "All_Calls": 23
                },
                {
                    "A_Name": "Charl Mulder",
                    "Q_Name": "Retalix",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 3,
                    "OutBound_Calls": 16,
                    "All_Calls": 19
                },
                {
                    "A_Name": "Rudolph Kaywa",
                    "Q_Name": "Retalix",
                    "A_Status": "Technical Assistance",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 0,
                    "OutBound_Calls": 2,
                    "All_Calls": 2
                },
                {
                    "A_Name": "Siyanda Mngeni",
                    "Q_Name": "Retalix",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 8,
                    "OutBound_Calls": 8,
                    "All_Calls": 16
                },
                {
                    "A_Name": "Kyle Petersen",
                    "Q_Name": "Retalix",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 2,
                    "OutBound_Calls": 17,
                    "All_Calls": 19
                },
                {
                    "A_Name": "Yanga Mlala",
                    "Q_Name": "Retalix",
                    "A_Status": "",
                    "Ring_No_Answer": 0,
                    "Answered_Calls": 4,
                    "OutBound_Calls": 40,
                    "All_Calls": 44
                }
            ]
        ],
        "recordset": [
            {
                "A_Name": "Meagan Adams",
                "Q_Name": "NetPOS",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 3,
                "OutBound_Calls": 11,
                "All_Calls": 14
            },
            {
                "A_Name": "Shea Slinger",
                "Q_Name": "NetPOS",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 4,
                "OutBound_Calls": 19,
                "All_Calls": 23
            },
            {
                "A_Name": "Curwyn Robertson",
                "Q_Name": "NetPOS",
                "A_Status": "Technical Assistance",
                "Ring_No_Answer": 0,
                "Answered_Calls": 4,
                "OutBound_Calls": 23,
                "All_Calls": 27
            },
            {
                "A_Name": "Damsley Jacobs",
                "Q_Name": "NetPOS",
                "A_Status": "Technical Assistance",
                "Ring_No_Answer": 0,
                "Answered_Calls": 0,
                "OutBound_Calls": 8,
                "All_Calls": 8
            },
            {
                "A_Name": "Snazo Qwesha",
                "Q_Name": "NetPOS",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 3,
                "OutBound_Calls": 22,
                "All_Calls": 25
            },
            {
                "A_Name": "Mfanelo Ngcokovane",
                "Q_Name": "NetPOS",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 1,
                "OutBound_Calls": 8,
                "All_Calls": 9
            },
            {
                "A_Name": "Imraan Abrahams ",
                "Q_Name": "NetPOS",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 4,
                "OutBound_Calls": 6,
                "All_Calls": 10
            },
            {
                "A_Name": "Nicholas Arendse",
                "Q_Name": "NetPOS",
                "A_Status": null,
                "Ring_No_Answer": 0,
                "Answered_Calls": 2,
                "OutBound_Calls": 14,
                "All_Calls": 16
            },
            {
                "A_Name": "Dillon Davids",
                "Q_Name": "PEC & Namos",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 10,
                "OutBound_Calls": 27,
                "All_Calls": 37
            },
            {
                "A_Name": "Angela Hitchcock",
                "Q_Name": "PEC & Namos",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 0,
                "OutBound_Calls": 5,
                "All_Calls": 5
            },
            {
                "A_Name": "Lona Deli",
                "Q_Name": "PEC & Namos",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 4,
                "OutBound_Calls": 19,
                "All_Calls": 23
            },
            {
                "A_Name": "Charl Mulder",
                "Q_Name": "Retalix",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 3,
                "OutBound_Calls": 16,
                "All_Calls": 19
            },
            {
                "A_Name": "Rudolph Kaywa",
                "Q_Name": "Retalix",
                "A_Status": "Technical Assistance",
                "Ring_No_Answer": 0,
                "Answered_Calls": 0,
                "OutBound_Calls": 2,
                "All_Calls": 2
            },
            {
                "A_Name": "Siyanda Mngeni",
                "Q_Name": "Retalix",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 8,
                "OutBound_Calls": 8,
                "All_Calls": 16
            },
            {
                "A_Name": "Kyle Petersen",
                "Q_Name": "Retalix",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 2,
                "OutBound_Calls": 17,
                "All_Calls": 19
            },
            {
                "A_Name": "Yanga Mlala",
                "Q_Name": "Retalix",
                "A_Status": "",
                "Ring_No_Answer": 0,
                "Answered_Calls": 4,
                "OutBound_Calls": 40,
                "All_Calls": 44
            }
        ],
        "output": {},
        "rowsAffected": [
            16
        ]
    };
};

let groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

let data = null;
if(dataset.recordset.length > 0){
    data = { grouped: groupBy(dataset.recordset,'Q_Name'), raw: dataset};
    return data;
}
else{
    return null;
};
}

app.get('/api/getAgentData', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate();
    let agentQueStats = 'Select Agent.A_Name, Queue_Groups.Q_Name, Agent.A_Status,AC_Ring_No_Answer as Ring_No_Answer, AC_Taken as Answered_Calls,AC_OutBound as OutBound_Calls, (AC_Taken + AC_OutBound) as [All_Calls] from Agent_Calls_Details, Queue_Groups, (Select cd_Agent_Code, SUM (OutBound_Calls) OutBound_Calls,COUNT(cd_Agent_Code) AllCalls FROM (Select cd_Agent_Code, ' +
    'case when CD_Outbound = 1 then CD_Outbound else  0 end as [OutBound_Calls] ' +
    'from Call_Details ' +
    "where CD_Date = '" + formatted_date +
    "') Y " +
    'Group by cd_Agent_Code ' +
    ') x, Agent ' +
    'Where x.cd_Agent_Code = Agent_Calls_Details.AC_Agent_Code ' +
    'and Agent.A_Group = Queue_Groups.Q_Code and ' +
    "Agent_Calls_Details.Ac_date = '" + formatted_date + "' and " +
    'agent.A_Code = x.CD_Agent_Code ' +
    'order by Q_Name asc ';
executeQuery(res,agentQueStats );
    
});


app.get('/api/getAvgPerAgent', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate();
    let agentQueStats = 'Select Agent.A_Name, Queue_Groups.Q_Name, Agent.A_Status, AC_Ring_No_Answer as Ring_No_Answer, AC_Taken as Answered_Calls, AC_Outbound as OutBound_Calls, (AC_Taken+AC_Outbound) as [All_Calls] from Agent_Calls_Details, Queue_Groups, Agent Where Agent.A_Group = Queue_Groups.Q_Code and Agent_Calls_Details.AC_Date = '+formatted_date+' and agent.A_Code = AC_Agent_Code order by Q_Name asc';
executeQuery(res,agentQueStats );
    
});




app.get('/api/getHourlyData', function (req, res) {
    //get incoming , ring no answer abandoned outgoing
     const dataset = getHourlyData();
     res.setHeader('Content-Type', 'application/json');
     res.send({data:dataset});
});

app.get('/api/agentCallsPerHour',function(req,res){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate();
    let callsPerhour = "select HourPeriod, sum(Call_Amount) as Calls from " +
            '( ' +
            'select HourPeriod, ' +
            "case when cd_status = 'Answered' then count(cd_status) else 0 end as [Call_Amount] " +
            'from HourPeriods ' +
            'left join Call_details ' +
            "on (Datepart(Hour,CD_Time_Of_Call) = Hourval) and (cd_date = '" + formatted_date + "') " +
            'group by Datepart(Hour,CD_Time_Of_Call), cd_status, hourperiod ' +
            ') ' +
            'as x ' +
            'group by hourperiod';
    
        executeQuery (res, callsPerhour);
});

app.get('/api/avgRingTime',function(req,res){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate();
    let avgRingTime = 'select HourPeriod, ' +
    "datepart(second,DATEADD(MS,Avg(datediff(ms,'00:00:00.000', CD_Ring_Time)),'00:00:00.000')) as [Total] " +
    'from HourPeriods ' +
    'Left Join Call_details on ' +
    "(Datepart(Hour,CD_Time_Of_Call) = HourVal) and cd_date = '" + formatted_date + "'  " +
    'group by HourPeriod';
        executeQuery (res, avgRingTime);
});

app.get('/api/getIncoming',function(req,res){
    
    const Incoming = "Select Incomming as Incomming from Call_Stage";
        executeQuery (res, Incoming);
})

app.get('/api/getInque',function(req,res){
   
    const inQue = "Select In_Que from Call_Stage";
    executeQuery(res, inQue);
});


app.get('/api/getOutgoing',function(req,res){
    
    const outgoing = 'Select Outgoing_Calls as Outgoing from Call_Stage';
    executeQuery(res, outgoing);
});

app.get('/api/getAbandoned',function(req,res){
    let abandonedSql = "Select Abandoned from Call_Stage";
    executeQuery(res, abandonedSql);
});

app.get('/api/getNoAnswer',function(req,res){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate();
let noAnswer = "select SUM(ac_ring_no_answer) as Ring_No_Answer from Agent_Calls_Details where AC_Date = '" + formatted_date + "' and AC_Agent_Code <> 0";
    executeQuery(res, noAnswer);
});


var server = app.listen(3001, function () {
    console.log(`Find the server at: http://localhost:${3001}/`);
});