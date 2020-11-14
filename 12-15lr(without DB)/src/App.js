import React from 'react';
import './styles/App.scss'
import Layout from "./components/HOC/Layout";
import {Router} from "./components/HOC/Router";

export const App = () => (
    <div className={'App'}>
        <Layout>
            <Router/>
        </Layout>
    </div>
);