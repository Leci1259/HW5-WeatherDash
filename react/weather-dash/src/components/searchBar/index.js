import React, { useState } from 'react';
import { InputGroup, Button, Form, Card } from 'react-bootstrap'
import './style.css'
import getWeatherInfo from '../../utils/api'


const cityArray = [];

export default function Searchbar() {
    const [cityName, setCityName] = useState('');

    const handleInputChange = (event) => {
        const value = event.target;
        setCityName(value);
    };

    const handleFormSubmit = async () => {
        cityArray.push(cityName);
        try {
            const data = await getWeatherInfo(cityName);

        } catch (e) {
            console.log(e);
        }

    };



    return (
        <Card id="search-box" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>
                    <InputGroup className="mb-3">
                        <Form.Label> Search For A City </Form.Label>
                        <Form.Control
                            placeholder="Atlanta"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            className="searchInput"
                            onChange={handleInputChange}
                        />
                        <Button variant="outline-secondary" id="button-addon2" className="searchInput" onClick={handleFormSubmit}>
                            Search
                        </Button>
                    </InputGroup>
                </Card.Title>
                <Card.Text>
                    {cityArray.map((city) => {
                        <Button> city </Button>
                    }
                    )}
                </Card.Text>
            </Card.Body>
        </Card>


    )
}
