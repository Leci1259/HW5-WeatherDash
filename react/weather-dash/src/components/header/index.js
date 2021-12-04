import React from 'react'
import './style.css'
import ParticlesBg from 'particles-bg'
import { WiDaySunny, WiMoonFull } from 'react-icons/wi';

export default function Header() {
    return (
        <header>
            <WiDaySunny id="sunny" />
            <h1>Weather Dash</h1>
            <WiMoonFull />
            <ParticlesBg color={["#ffff99", "#c8e3fe", "#f2acb1", "#f0c588", "#ffd500"]} num={50} type="square" bg={true} />
        </header>
    )
};