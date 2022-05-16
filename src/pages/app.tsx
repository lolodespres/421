import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Welcome from './welcome';
import Game421 from '../components/game/Game421';



const App = () => {

    return (
        <>
            <div id="wrapper">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/421" element={<Game421 />} />
                </Routes>
            </div>
            <div id="avertissement" className="container">
                <p>
                    Attention pour des raisons d'esthétique et pratique le jeu n&apos;est visible qu&apos;en
                    mode paysage.
                </p>
            </div>
        </>
    );
}

export default App;