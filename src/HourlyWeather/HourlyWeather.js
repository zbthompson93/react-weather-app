import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import loadingGif from '../images/loading-animation.gif';
import Skycons from 'react-skycons';


function HourlyWeather() {
  const [data, setData] = useState({ hourly: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let currentDateObj = new Date;
  let currentDate = "";
  currentDate += currentDateObj.getFullYear() + "-0" + (currentDateObj.getMonth() + 1) + "-" + currentDateObj.getDate();

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
            }
        }

        const result = await axios('/hourly', parameters);
        let resultData = result.data[currentDate];

        let displayData = [];

        let count = 0;

        for(let i = 0; i < resultData.length; i++){
          let temp = Math.round(resultData[i].temperature);

          let time = resultData[i].time;
          time = time.slice(11,13);

          if(parseInt(time) > 12){
            time = (parseInt(time) - 12) + " PM"
          } else{
            time = time.slice(1) + " AM"
          }

          let humidity = (resultData[i].humidity)*100;
          let humidityStr = humidity.toString();
          humidityStr += "%";

          let icon = resultData[i].icon;
          icon = icon.toUpperCase();

          count++

          let obj = {
            objectID: count,
            temperature: temp,
            time: time,
            humidity: humidity,
            icon: icon
          }

          displayData.push(obj);
        }

        setData({hourly: displayData});
      } catch(error) {
        console.log(error)
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [])


  return (
    console.log(data.hourly),
    <div className="main-container">
      <h1>Hourly Weather</h1>
      <Row>
        <Col xs={5}></Col>
        <Col xs={1}><a className="btn btn-primary" href="/">Home</a></Col>
        <Col xs={1}><a className="btn btn-primary" href="/daily">Daily</a></Col>
        <Col xs={5}></Col>
      </Row>

      {isError ? (
        <div className="error-msg">Hourly weather data is not available right now.</div>
      ) : isLoading ? (
        <div>
          <img src={loadingGif} />
        </div>
      ) : (
        <div className="daily-weather-container">
          <table className="table">
            <thead>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col">Temperature</th>
              <th scope="col">Humidity</th>
            </thead>
            <tbody>
              {data.hourly.map(item => (
                <tr key={item.objectID}>
                  <td>{item.time}</td>
                  <td>
                    <div style={{width: '100px', margin: 'auto'}} >
                      <Skycons
                        color='black'
                        icon={item.icon}
                        autoplay={true}
                      />
                    </div>
                  </td>
                  <td>{item.temperature}&#8457;</td>
                  <td>{item.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HourlyWeather;
