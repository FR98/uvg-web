import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../store';

import Babies from '../Babies';

const store = configureStore();

const App = () => (
    <Provider store = {store}>
        <Babies />
    </Provider>
);

export default App;