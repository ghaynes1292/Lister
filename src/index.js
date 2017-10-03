import React from 'react';
import { render } from 'react-dom';
import Index from './pages/index';

import registerServiceWorker from './registerServiceWorker';

render(<Index />, document.querySelector('#root'));
registerServiceWorker();
