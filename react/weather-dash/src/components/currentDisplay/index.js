import React, { useState } from 'react'
import { Container, Row, Card } from 'react-bootstrap'
import './style.css'


export default function Display() {


    return (
        <div className="box">
            <Container fluid className="topDisplay">
                <Row>
                    <h3> Header </h3>
                    <ul>
                        <li>Temp:<span class="today"></span><span>&#8457;</span></li>
                        <li>Wind:<span class="today"></span> MPH</li>
                        <li>Humidity:<span class="today"></span><span>&#37;</span></li>
                        <li>UV Index:<span class="today"></span></li>
                    </ul>
                </Row>
            </Container>
            <div id="cards">
                <Card classname="card">
                    <h6 >Title</h6>
                    <ul>
                        <li>Temp: <span class="week"></span><span>&#8457; </span> </li>
                        <li>Wind: <span class="week"></span>MPH</li>
                        <li>Humidity: <span class="week"></span><span>&#37; </span></li>
                    </ul>
                </Card>
                <Card classname="card">
                    <h6 >Title</h6>
                    <ul>
                        <li>Temp: <span class="week"></span><span>&#8457; </span> </li>
                        <li>Wind: <span class="week"></span>MPH</li>
                        <li>Humidity: <span class="week"></span><span>&#37; </span></li>
                    </ul>
                </Card>
            </div>
        </div>
    )
}