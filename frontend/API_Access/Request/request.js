const http = require("http");

function getRequest(path, data = undefined) {
  return new Promise((resolve, reject) => {
    //let url ="http://localhost:8000/wba2api/"+urlEnd;
    var daten = "";
    var options;
    //console.log(data)

    if (data != undefined) {
      options = {
        hostname: "localhost",
        port: 8000,
        path: path,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      };
    } else {
      options = {
        hostname: "localhost",
        port: 8000,
        path: path,
        method: "GET",
      };
    }

    //console.log(options)

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
        resolve(da);
      });
    });

    req.on("error", (error) => {
      //console.error(error)
      reject(error);
    });

    if (data != undefined) {
      //console.log("test")
      req.write(data);
    }

    req.end();
  });
}

function postRequest(path, data) {
  return new Promise((resolve, reject) => {
    //let url ="http://localhost:8000/wba2api/"+urlEnd;
    var daten = "";
    //console.log(data)

    const options = {
      hostname: "localhost",
      port: 8000,
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
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

function putRequest(path, data) {
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

function deleteRequest(path) {
  return new Promise((resolve, reject) => {
    //let url ="http://localhost:8000/wba2api/"+urlEnd;
    var options = {
      hostname: "localhost",
      port: 8000,
      path: path,
      method: "DELETE",
    };
    //console.log(options)

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
        resolve(da);
      });
    });

    req.on("error", (error) => {
      //console.error(error)
      reject(error);
    });

    if (data != undefined) {
      //console.log("test")
      req.write(data);
    }

    req.end();
  });
}

module.exports = { getRequest, postRequest, putRequest, deleteRequest };
