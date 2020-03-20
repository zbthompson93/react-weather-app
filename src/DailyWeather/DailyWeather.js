import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import loadingGif from '../images/loading-animation.gif';
import Skycons from 'react-skycons';
import raindrop from '../images/raindrop.svg';
import sun from '../images/sunrise.svg';


function DailyWeather() {
  const [data, setData] = useState({ daily: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let currentDate = new Date;
  let currentTime = currentDate.getTime();
  let currentTimeStr = currentTime.toString();
  let currentTimeFormatted = currentTimeStr.slice(0, -3);

  // Add this section to Redux?
  let latitude;
  let longitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        let parameters =  {
            params: {
              lat: latitude,
              lng: longitude,
              time: currentTimeFormatted
            }
        }

        const result = await axios('/daily', parameters);

        let time = new Date(result.data.time);
        let date = time.toString();
        date = date.slice(0,9);

        let sT = result.data.sunriseTime;
        let sTstr = sT.toString();
        sTstr += "000";
        let sunriseDateObj = new Date(parseInt(sTstr));
        let sunriseTime = sunriseDateObj.toString();
        sunriseTime = sunriseTime.slice(17,21);

        let ss = result.data.sunsetTime;
        let sSstr = ss.toString();
        sSstr += "000";
        let sunsetDateObj = new Date(parseInt(sSstr));
        let sunsetTime = sunsetDateObj.toString();
        let sunsetTimeHr = sunsetTime.slice(16,18);
        let sunsetTimeMin = sunsetTime.slice(19,21);
        sunsetTimeHr = (parseInt(sunsetTimeHr) - 12)
        sunsetTime = sunsetTimeHr + ":" + sunsetTimeMin;

        let precip = (result.data.precipProbability)*100;
        let precipStr = precip.toString();
        precipStr += "%";

        let icon = result.data.icon;
        icon = icon.toUpperCase();

        setData({
          currentDate: date,
          sunriseTime: sunriseTime,
          sunsetTime: sunsetTime,
          precipProb: precipStr,
          weatherIcon: icon
        });
      } catch(error) {
        console.log(error)
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [])


  return (
    <div className="main-container">
      <h1>Daily Weather</h1>
      <Row>
        <Col xs={5}></Col>
        <Col xs={1}><a className="btn btn-primary" href="/">Home</a></Col>
        <Col xs={1}><a className="btn btn-primary" href="/hourly">Hourly</a></Col>
        <Col xs={5}></Col>
      </Row>

      {isError ? (
        <div className="error-msg">Daily weather data is not available right now.</div>
      ) : isLoading ? (
        <div>
          <img src={loadingGif} />
        </div>
      ) : (
        <div className="daily-weather-container">
          <Row>
            <Col xs={2}></Col>
            <Col xs={3} ><h3>{data.currentDate}</h3></Col>
            <Col xs={2}></Col>
            <Col xs={3} style={{marginTop: '10px'}}>
              <span>{data.sunriseTime} AM&nbsp;</span>
              <span><img src={sun} style={{width: '20px', paddingBottom: '3px'}} /></span>
              <span>&nbsp;{data.sunsetTime} PM</span>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={3}>
              <div style={{width: '100px', margin: 'auto'}} >
                <Skycons
                  color='black'
                  icon={data.weatherIcon}
                  autoplay={true}
                />
              </div>
              <span>{data.weatherIcon}</span>
            </Col>
            <Col xs={2}></Col>
            <Col xs={3}><span>{data.precipProb} &nbsp;</span>
              <span><img src={raindrop} style={{width: '12px', paddingBottom: '3px'}} /></span>
            </Col>
            <Col xs={2}></Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default DailyWeather;

// rain, snow, partly-cloudy-day, partly-cloudy-night style={{textAlign: 'left'}}
