const http = require('http');

module.exports={
  add,
}

//Nicht fertig, es fehlen noch daten
//funktioniert. die fehlerbehandlung fehlt noch
function add(name, pass) {
    
    //Body
    const data = JSON.stringify({
        id: 1,
        benutzername: name,
        passwort: pass,
        benutzerrolle: {
            id: 1,
        },
        person: {
          id: 1,
        },
      
      });
      
      //Header
      const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/api/benutzer',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }
      
      const req = http.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`)
        //console.log("Post request")
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
        console.error(error)

      })
      
      req.write(data);
      req.end();

};