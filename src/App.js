import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard/Dashboard.js'
import DailyWeather from './DailyWeather/DailyWeather.js'
import HourlyWeather from './HourlyWeather/HourlyWeather.js'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/daily" component={DailyWeather} />
      <Route path="/hourly" component={HourlyWeather} />
    </Switch>
  );
}

export default App;


//"proxy": "http://localhost:5000/" setData({time: {currentDate: date}});
