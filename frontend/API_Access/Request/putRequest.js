const http = require("http");

function postRequest(path, data) {
  return new Promise((resolve, reject) => {
    //let url ="http://localhost:8000/wba2api/"+urlEnd;
    var daten = "";
    //console.log(data)

    const options = {
      hostname: "localhost",
      port: 8000,
      path: path,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //"Content-Length": data.length,
      },
    };

    console.log(options);

    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on("data", (d) => {
        //process.stdout.write(d)
        //console.log(d)
        daten += d;
      });
      res.on("end", () => {
        let da = JSON.parse(daten);
        //console.log("Test")
        //console.log(da)
        //console.log("da")
        resolve(da.daten);
      });
    });

    req.on("error", (error) => {
      console.error(error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

module.exports = postRequest;
