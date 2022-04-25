import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Welcome from './welcome';



const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
        </Routes>
    );
}

export default App;