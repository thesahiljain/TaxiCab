import React from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client/dist/socket.io";

import Home from './src/components/Home/Home';
import Track from './src/components/Track/Track';
import { HomeReducer as home } from './src/components/Home/HomeUtils';
import { TrackReducer as track } from './src/components/Track/TrackUtils';

const App = () => {

  const reducer = combineReducers({home, track});
  const log = createLogger({diff: true, collapsed: true});
  let socket = io("http://localhost:5000", {jsonp:false});
  let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
  const middleWare = [thunk, log, socketIoMiddleware];
  const store =  createStore(reducer, {}, applyMiddleware(...middleWare));

  return (
    <Provider store={store}>
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="home" title="home" component={Home} initial/>
          <Scene key="track" title="track" component={Track}/>
        </Scene>
      </Router>
    </Provider>
  );
}

export default App;