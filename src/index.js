// Autoadd all scss/css/ts files
function importAll (r) {
    r.keys().forEach(r);
}
  
importAll(require.context('./', true, /\.scss|css|ts$/));