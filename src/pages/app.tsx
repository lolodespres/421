import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Welcome from './welcome';



const App = () => {

    return (
        <>
            <div id="wrapper">
                <Routes>
                    <Route path="/" element={<Welcome />} />
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