import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
/* we import react dom and import App that what we want to render
thus this code make App enalble to creacte website / getting from bootstrap instead of css code
*/
serviceWorker.unregister();
