import React from 'react';
import '../App.css';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";


function Dashboard() {
  //const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();
  //
  //
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  //   alert("Geolocation is not supported by this browser.");
  // }
  //
  // function showPosition(position) {
  //   dispatch(addLat(position.coords.latitude))
  //   dispatch(addLng(position.coords.longitude));
  // }

  return (
    <div className="main-container">
      <h1>Welcome to the Weather App!</h1>
      <Row style={{marginBottom: '30px'}}>
        <Col xs={5}></Col>
        <Col xs={1}><a className="btn btn-primary" href="/daily">Daily</a></Col>
        <Col xs={1}><a className="btn btn-primary" href="/hourly">Hourly</a></Col>
        <Col xs={5}></Col>
      </Row>
    </div>
  );
}

export default Dashboard;
