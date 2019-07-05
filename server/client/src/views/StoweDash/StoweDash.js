import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
} from 'reactstrap';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



let groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandDanger,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

// Card Chart 2
const incomingCalls = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandSuccess,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, incomingCalls.datasets[0].data) - 5,
          max: Math.max.apply(Math, incomingCalls.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandDanger,
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}



class StoweDash extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.initializeData = this.initializeData.bind(this);
    //this.makeDataCall = this.makeDataCall.bind(this);

    this.getHourlyData = this.getHourlyData.bind(this);
    this.getHeaderData = this.getHeaderData.bind(this);

    this.fetchHeaderData = this.fetchHeaderData.bind(this);
    this.fetchHourlyData = this.fetchHourlyData.bind(this);
    this.fetchAgentData = this.fetchAgentData.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      incomingCalls: 0,
      inQue: 0,
      longestWaitTime: 0,
      outgoing: 0,
      noAnswer: 0,
      abandoned: 0,
      callsPerHour: null,
      callsPerAgent: null,
      agentData: null,
      avgRingTimePerHour: null,
    };
  }

  async getHeaderData() {
    let hasFailed = false;
    let headerData = {
      incoming: null,
      outgoing: null,
      inQ: null,
      noAnswer: null,
      abandoned: null
    };

    let promises = [
      await fetch('api/getIncoming', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            headerData.incoming = res.data.data.recordset[0].Incomming;
          })
      ).catch((err)=> {
        hasFailed = true;
       //console.log('getIncoming has err : >', err)
      }),
      await fetch('api/getInque', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            headerData.inQ = res.data.data.recordset[0].In_Que;
          })
      )
      .catch((err)=> {
        hasFailed = true;
        //console.log('getInque has err : >', err)
      }),
      await fetch('api/getLongestWait', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            let datestring = res.data.data.recordset[0].longest_Wait_Time.toString();
           const stringlength = datestring.length;
            datestring = datestring.slice(11, stringlength);
            datestring = datestring.slice(0, 8);
            headerData.longestWaitTime = datestring;
          })
      )
      .catch((err)=> {
        hasFailed = true;
        //console.log('getInque has err : >', err)
      }),
      await fetch('api/getOutgoing', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            headerData.outgoing = res.data.data.recordset[0].Outgoing;
          })
      )
      .catch((err)=> {
        hasFailed = true;
        //console.log('getOutgoing has err : >', err)
      }),
      await fetch('api/getAbandoned', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            headerData.abandoned = res.data.data.recordset[0].Abandoned;
          })
      )
      .catch((err)=> {
        hasFailed = true;
        //console.log('getAbandoned has err : >', err)
      }),
      await fetch('api/getNoAnswer', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            headerData.noAnswer = res.data.data.recordset[0].Ring_No_Answer;
          })
      ).catch((err)=> {
        hasFailed = true;
        //console.log('getNoAnswer has err : >', err)
      })
    ];

    await Promise.all(promises)
      .then(data => {
       // console.log({
        ///  incoming: headerData.incoming, 
        ///  inQ:headerData.inQ,
         // outgoing: headerData.outgoing,
         // noAnswer: headerData.noAnswer,
        //  abandoned:headerData.abandoned 
        // })
        if( headerData.incoming !== null  && headerData.inQ  !== null&& headerData.outgoing!== null && headerData.noAnswer!== null && headerData.abandoned!== null && headerData.longestWaitTime !== null ){
            this.setState({
              incomingCalls: headerData.incoming,
              inQue: headerData.inQ,
              longestWaitTime: headerData.longestWaitTime,
              outgoing: headerData.outgoing,
              noAnswer: headerData.noAnswer,
              abandoned: headerData.abandoned,
            });
        }
      }).catch((err)=> {
        hasFailed = true;
       // console.log('getheader promise has err : >', err)
      })
     // console.log('hasFailed ==>',hasFailed);
    return headerData;
  }

  async getHourlyData() {
    let hasFailed = false;
    let hourlydata = {
      agentCallsPerHour: null,
      avgRingTime: null,
    }
    let promises = [
      await fetch('api/agentCallsPerHour', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            hourlydata.agentCallsPerHour = res.data.data.recordset;
          })
      ).catch((err)=> {
        hasFailed = true;
        //console.log('agentCallsPerHour has err : >', err)
      }),
      await fetch('api/avgRingTime', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }
          )).then(res => {
            hourlydata.avgRingTime = res.data.data.recordset;
          })
      ).catch((err)=> {
        hasFailed = true;
      //  console.log('avgRingTime has err : >', err)
      }),
    ]
    await Promise.all(promises)
      .then(data => {
        const objPerHr = hourlydata.agentCallsPerHour;
        const objRingPerHr = hourlydata.avgRingTime;
        if(objPerHr !== null && objPerHr[0] !== null && objRingPerHr !== null && objRingPerHr[0] !== null){
        

        let CallsPerHourbar = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [
            {
              label: 'Calls Per Hour',
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [
                objPerHr[0].Calls, objPerHr[1].Calls, objPerHr[2].Calls,
                objPerHr[3].Calls, objPerHr[4].Calls, objPerHr[5].Calls, objPerHr[6].Calls, objPerHr[7].Calls,
                objPerHr[8].Calls, objPerHr[9].Calls, objPerHr[10].Calls, objPerHr[11].Calls, objPerHr[12].Calls,
                objPerHr[13].Calls, objPerHr[14].Calls, objPerHr[15].Calls, objPerHr[16].Calls, objPerHr[17].Calls,
                objPerHr[18].Calls, objPerHr[19].Calls, objPerHr[20].Calls, objPerHr[21].Calls, objPerHr[22].Calls, objPerHr[23].Calls]
            },
          ],
        };

        let AvgRingTimePerHour = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [
            {
              label: 'Ring Time Per Hour',
              backgroundColor: 'rgba(255,99,132,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [
                objRingPerHr[0].Total, objRingPerHr[1].Total, objRingPerHr[2].Total,
                objRingPerHr[3].Total, objRingPerHr[4].Total, objRingPerHr[5].Total, objRingPerHr[6].Total, objRingPerHr[7].Total,
                objRingPerHr[8].Total, objRingPerHr[9].Total, objRingPerHr[10].Total, objRingPerHr[11].Total, objRingPerHr[12].Total,
                objRingPerHr[13].Total, objRingPerHr[14].Total, objRingPerHr[15].Total, objRingPerHr[16].Total, objRingPerHr[17].Total,
                objRingPerHr[18].Total, objRingPerHr[19].Total, objRingPerHr[20].Total, objRingPerHr[21].Total, objRingPerHr[22].Total, objRingPerHr[23].Total],
            },
          ],
        };
        
          this.setState({
            callsPerHour: CallsPerHourbar,
            avgRingTimePerHour: AvgRingTimePerHour
          });
        }
      }).catch((err)=> {
        hasFailed = true;
       // console.log('getHourlyData promise has err : >', err)
      });
     // console.log('getHourlyData promise = ',hasFailed)
      return hourlydata;
  }

  async getAgentData() {
    let hasError = false;
    let objReturn = {
      agentdata: null,
      callperagent: null,
    }
    let promises = [
     
      await fetch('api/getAgentData', {
        accept: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status
        })
        ).then(res => {
          objReturn.agentdata = res.data.data.recordset;
        //  console.log('res for agent data:>', res);
          let names = Object.keys(res.data.data.recordset).map((k, i) => { return res.data.data.recordset[k].A_Name });
          let data = Object.keys(res.data.data.recordset).map((k, i) => { return res.data.data.recordset[k].All_Calls });

          objReturn.callperagent = {
            labels: names,
            datasets: [
              {
                label: 'Total Calls Per Agent',
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data,
              },
            ],
          };

        })).catch((err)=> {
          hasError = true;
          console.log('getAgentData 2nd has err : >', err)
        })
    ];

    

    await Promise.all(promises)
      .then(data => {
         if(objReturn.agentdata !== null && objReturn.callperagent !== null ){
          let grouped = groupBy(objReturn.agentdata, 'Q_Name');
          this.setState({
            agentData: grouped,
            callsPerAgent: objReturn.callperagent,
          });
         }
      
      }).catch((err)=> {
        hasError = true;
        console.log('getAgentData 2nd promise has err : >', err)
      });

  
    return objReturn;
  }

  async fetchHeaderData() {
    // get header data per second
    setInterval(async function () {
      let data = await this.getHeaderData();
    }.bind(this), 5000);
  }

  async fetchHourlyData() {
    // get hourly data
    setInterval(async function () {
      let data = await this.getHourlyData();
    }.bind(this), 900000);
  }

  fetchAgentData() {
    // get hourly data
    setInterval(async function () {
      let data = await this.getAgentData();
    }.bind(this), 900000);
  }

  async initializeData() {
    // setup initial data calls
    this.fetchHeaderData();
    this.fetchHourlyData();
    this.fetchAgentData();

    await this.getAgentData();
    await this.getHourlyData();
    await this.fetchAgentData();

  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentDidMount() {
    this.initializeData();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (

      <div className="animated fadeIn" >
        <div style={{paddingTop:'10px'}}></div>

        <Row>
        
          <Col xs="12" sm="6" lg="2">
            <Card className="text-white cardOverwirte flexBox" style={{backgroundColor: '#0ee258'}}>
              <CardBody className="pb-0 cardbodyOverwrite">
                <div className="text-value" style={{ fontSize: 170, paddingTop: '45px'  }}> {this.state.incomingCalls}</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: 70}}>
              <div style={{ fontSize: 27, paddingTop:'30px'}}> Incoming Calls</div>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2">
            <Card className="text-white cardOverwirte flexBox" style={{backgroundColor: '#ff0f0d'}}>
              <CardBody className="pb-0 cardbodyOverwrite">
                <div className="text-value" style={{fontSize: 170, paddingTop: '45px' }}>{this.state.noAnswer}</div>

                
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: 70 }}>
              <div style={{  fontSize: 27, paddingTop:'30px' }}>Ring No Answer</div>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="2">
            <Card className="text-white cardOverwirte flexBox" style={{backgroundColor: '#ff0f0d'}}>
              <CardBody className="pb-0 cardbodyOverwrite">
                <div className="text-value" style={{ fontSize: 170, paddingTop: '45px' }}>{this.state.abandoned}</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: 70 }}>
              <div style={{ fontSize: 27 , paddingTop:'30px'}}>Abandoned Calls</div>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white cardOverwirte flexBox" style={{backgroundColor: '#0cb2ec'}}>
              <CardBody className="pb-0 cardbodyOverwrite">
                <div className="text-value" style={{ fontSize: 170, paddingTop: '45px' }}>{this.state.outgoing}</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: 70 }}>
              <div style={{  fontSize: 27, paddingTop:'30px' }}>Outgoing Calls</div>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white cardOverwirte flexBox"  style={{backgroundColor: '#0cb2ec'}}>
              <CardBody className="pb-0 cardbodyOverwrite">
                {/* <div className="text-value" style={{ fontSize: 170, paddingTop: '45px' }}>{this.state.outgoing}</div> */}
              </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: 234 }}>
                <div style={{  fontSize: 27, paddingTop:'15px' }}>Waiting Time</div>
                <br/>
                <div style={{  fontSize: 79,paddingTop:'5px' }}> {this.state.longestWaitTime}</div>
                <div style={{  fontSize: 27, paddingTop:'25px' }}>Calls in the Queue</div>
                <br/>
                <div style={{  fontSize: 79 , paddingTop:'5px' }}> {this.state.inQue}</div>
              </div>
            </Card>
          </Col>
        </Row> <Row>
          <Col xs="12" sm="6" lg="6">
            <Card className="cardOverwirte">
              <CardHeader>
                Amount Of Calls per Hour
              </CardHeader>
              <CardBody >
                <div className="chart-wrapper">
                  {
                    this.state.callsPerHour && <Bar data={this.state.callsPerHour} options={options}  />
                  }

                </div>
              </CardBody>
            </Card>
            <Card className="cardOverwirte">
              <CardHeader>
                Average Ring Time Per Hour
              </CardHeader>
              <CardBody >
                <div className="chart-wrapper">
                  {
                    this.state.avgRingTimePerHour && <Bar data={this.state.avgRingTimePerHour} options={options} />
                  }
                </div>
              </CardBody>
            </Card>
            <Card className="cardOverwirte" >
          <CardHeader>
            All Calls Per Agent
                </CardHeader>
            <CardBody >
              <div className="chart-wrapper" height="">
                {
                  this.state.callsPerAgent && <Bar data={this.state.callsPerAgent} options={options} height={ 200} />
                }
              </div>
          </CardBody>
        </Card>
          </Col>
          <Col xs="12" sm="6" lg="6">
            <Card className="cardOverwirte">
              <CardHeader>
                Agent Queue Statistics
            </CardHeader><CardBody className="cardbodyOverwrite">
                <Table responsive>
                  <thead>
                    <tr style={{ backgroundColor: "grey" }}>
                      <th style={{ color: "white" }}>Agents</th>
                      <th style={{ color: "white" }}>Status</th>
                      <th style={{ color: "white" }}>RNA</th>
                      <th style={{ color: "white" }}>Outb. Calls</th>
                      <th style={{ color: "white" }}>Ans. Calls</th>
                      <th style={{ color: "white" }}>All Calls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: '#f0f3f5' }}><td style={{ fontWeight: 'bold' }}>NetPOS</td><td></td><td></td><td></td><td></td><td></td></tr>



                    {this.state.agentData && this.state.agentData['NetPOS'] &&
                      Object.keys(this.state.agentData['NetPOS']).map((k, i) => {
                        let data = this.state.agentData['NetPOS'][k];
                        return (
                          <tr key={i}>
                            <td>{data.A_Name}</td>
                            <td>{data.A_Status}</td>
                            <td>{data.Ring_No_Answer}</td>
                            <td>{data.OutBound_Calls}</td>
                            <td>{data.Answered_Calls}</td>
                            <td style={{ fontWeight: 'bold' }}>{data.All_Calls}</td>
                          </tr>
                        );
                      })}


                    <tr style={{ backgroundColor: '#f0f3f5' }}><td style={{ fontWeight: 'bold' }}>PEC. Namos</td><td></td><td></td><td></td><td></td><td></td></tr>
                    {this.state.agentData && this.state.agentData['PEC & Namos'] &&
                      Object.keys(this.state.agentData['PEC & Namos']).map((k, i) => {
                        let data = this.state.agentData['PEC & Namos'][k];
                        return (
                          <tr key={i}>
                            <td>{data.A_Name}</td>
                            <td>{data.A_Status}</td>
                            <td>{data.Ring_No_Answer}</td>
                            <td>{data.OutBound_Calls}</td>
                            <td>{data.Answered_Calls}</td>
                            <td style={{ fontWeight: 'bold' }}>{data.All_Calls}</td>
                          </tr>
                        );
                      })}
                    <tr style={{ backgroundColor: '#f0f3f5' }}><td style={{ fontWeight: 'bold' }}>Retalix</td><td></td><td></td><td></td><td></td><td></td></tr>
                    {this.state.agentData && this.state.agentData['Retalix'] &&
                      Object.keys(this.state.agentData['Retalix']).map((k, i) => {
                        let data = this.state.agentData['Retalix'][k];
                        return (
                          <tr key={i}>
                            <td>{data.A_Name}</td>
                            <td>{data.A_Status}</td>
                            <td>{data.Ring_No_Answer}</td>
                            <td>{data.OutBound_Calls}</td>
                            <td>{data.Answered_Calls}</td>
                            <td style={{ fontWeight: 'bold' }}>{data.All_Calls}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row> <Col xs="12" sm="12" lg="12">
        </Col>
        </Row>
      </div >
    );
  }
}

export default StoweDash;
