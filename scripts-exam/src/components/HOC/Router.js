import React from 'react';
import {Switch, Route} from "react-router-dom";
import {Information} from "../Information/Information";
import Shop from "../Shop/Shop";

export const Router = () => {
  return (
      <Switch>
          <Route path={'/'} exact>
              <Shop />
          </Route>

          <Route path={'/'}>
              <Information />
          </Route>
      </Switch>
  )
};