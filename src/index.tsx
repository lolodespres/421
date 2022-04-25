import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import 'core-js/features/array/flat-map'
import 'core-js/features/map'
import 'core-js/features/promise'
import 'core-js/features/set'
import 'raf/polyfill'
import 'whatwg-fetch'
import App from "./pages/app"

const container = document.getElementById('app-root') as HTMLElement;
const root = ReactDOMClient.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
