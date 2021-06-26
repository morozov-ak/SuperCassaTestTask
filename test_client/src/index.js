import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import thunk from 'redux-thunk'
import { compose,createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer';
const store = createStore(rootReducer,
  compose(applyMiddleware(thunk)
  //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  )

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>

  ,document.getElementById('root')
);


serviceWorker.unregister();
