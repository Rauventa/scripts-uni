import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {App} from "./App";

const application = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(application, document.getElementById('root'));
serviceWorker.unregister();
