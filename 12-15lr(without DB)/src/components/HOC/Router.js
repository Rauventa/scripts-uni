import React from 'react';
import {Route, Switch} from "react-router-dom";
import Persons from "../containers/Persons/Persons";
import {Information} from "../containers/Information";
import Edit from "../containers/Functions/Edit";
import Add from "../containers/Functions/Add";

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Persons />
            </Route>
            <Route path={'/information'} >
                <Information />
            </Route>
            <Route path={'/edit/:id'} >
                <Edit />
            </Route>
            <Route path={'/add'} >
                <Add />
            </Route>
        </Switch>
    )
};