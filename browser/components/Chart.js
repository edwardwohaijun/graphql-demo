import React, {Component} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

var Highcharts = require('highcharts');
const HighchartsDrilldown = require('highcharts/modules/drilldown');
HighchartsDrilldown(Highcharts);

var options = {
  chart: {height: 480},
  title: {text: 'Repos by primary languages'},
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

var chart;
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {drilldownBy: 'issues'}; // by: issues, stargazers, forks, watchers


  }



  onSelect = (evt, value) => {
    this.setState({drilldownBy: value})
  };



  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            drill down by
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            <div id='chart-container'></div>
          </div>
        </div>
    )}
}
const styles = {
  radioButton: {marginBottom: 16}
};
export default Chart;
