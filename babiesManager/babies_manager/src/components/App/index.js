import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureStore } from '../../store';

import Babies from '../Babies';
import AddBaby from '../AddBaby';

const store = configureStore();

const App = () => (
  <Provider store = {store}>
    <Router>
      <Switch>
        <Route path = '/add' component = {AddBaby} />
        <Route path = '/' component = {Babies} />
      </Switch>
    </Router>
  </Provider>
);

export default App;