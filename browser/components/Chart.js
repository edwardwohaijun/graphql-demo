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

    Highcharts.setOptions({
      lang: {drillUpText: '◁ Back to {series.name}'}
    });
    options.chart.renderTo = 'chart-container';
    options.chart.type = 'pie';
    chart = new Highcharts.Chart(options);
  };

  onSelect = (evt, value) => {
    this.setState({drilldownBy: value})
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.drilldownBy != this.state.drilldownBy){ // without this condition, the following code would run twice when this component is loaded
      options.drilldown = fillDrillDown(this.props.data, this.state.drilldownBy);

      Highcharts.setOptions({
        lang: {drillUpText: '◁ Back to {series.name}'}
      });
      options.chart.renderTo = 'chart-container';
      options.chart.type = 'pie';
      chart = new Highcharts.Chart(options);
    }
  };

  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <span style={{marginLeft: 50}}>Drill down by:</span>
            <RadioButtonGroup style={{marginLeft: 50, marginTop: 20}} onChange={this.onSelect} name="drillDownBy" defaultSelected="issues">
              <RadioButton value="issues" label="issues" style={styles.radioButton}/>
              <RadioButton value="forks" label="forks" style={styles.radioButton}/>
              <RadioButton value="stargazers" label="stargazers" style={styles.radioButton}/>
              <RadioButton value="watchers" label="watchers" style={styles.radioButton} />
            </RadioButtonGroup>
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
