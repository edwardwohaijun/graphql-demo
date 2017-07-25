import React, {Component} from 'react';
import RepoList from './RepoList';

var Highcharts = require('highcharts');
const HighchartsDrilldown = require('highcharts/modules/drilldown');
HighchartsDrilldown(Highcharts);

var options = {
  chart: {height: 480},
  title: {text: 'Repos by primary language'},
  xAxis: {categories: true},
  //drilldown:{},
  legend: {enabled: false},
  plotOptions: {
    series: {
      dataLabels: {enable: true},
      shadow: true
    },
    pie: {size: '80%'}
  },
  series: [{
    name: 'Overview',
    colorByPoint: true,
    data: []
  }]
};

const fillDrillDown = (srcData, byWhich) => {
  var drilldown = {series: []};
  var langs = {}, langName;
  srcData.forEach(d => {
    langName = d.node.primaryLanguage ? d.node.primaryLanguage.name : 'others';
    if (langName in langs){
      langs[langName].data.push({ name: d.node.name, y: d.node[byWhich].totalCount })
    } else {
      langs[langName] = {id: langName, name: langName, data: [{name: d.node.name, y: d.node[byWhich].totalCount}]}
    }
  });
  Object.values(langs).forEach(l => {
    drilldown.series.push(l)
  });
  return drilldown
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {drilldownBy: 'issues'}; // by: issues, stargazers, forks, watchers

    var langs = {}, langName;
    this.props.data.forEach(d => {
      langName = d.node.primaryLanguage ? d.node.primaryLanguage.name : 'others';
      if (langName in langs){
        langs[langName]++
      } else {
        langs[langName] = 1
      }
    });

    Object.keys(langs).forEach(l => {
      options.series[0].data.push({name: l, y: langs[l], drilldown: l})
    })
  }

  componentDidMount = () => {
    options.drilldown = fillDrillDown(this.props.data, this.state.drilldownBy);
    console.log('drilldown: ', options);

    Highcharts.setOptions({
      lang: {drillUpText: '◁ Back to {series.name}'}
    });
    options.chart.renderTo = 'chart-container';
    options.chart.type = 'pie';
    new Highcharts.Chart(options);
  };

  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList changeTab={()=>{}} repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={true} repoClickHanlder={this.props.repoClickHanlder} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            <div id='chart-container'></div>
          </div>
        </div>
    )}
}
export default Chart;
