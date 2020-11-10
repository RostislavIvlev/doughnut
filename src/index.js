import '../node_modules/jquery/dist/jquery';
let $ = require('jquery');

import './doughnut'

// Autoadd all scss/css/ts files
function importAll (r) {
    r.keys().forEach(r);
}
  
importAll(require.context('./', true, /\.scss|css|js$/));