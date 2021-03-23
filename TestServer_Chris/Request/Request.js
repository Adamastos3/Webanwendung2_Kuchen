const { fstat } = require('fs');
const http = require('http');
const fs = require('fs')

const d=test3();
console.log(d)




function test() {
    var url ="http://localhost:8000/api/benutzer/gib/1";

http.get(url,(response) => {
    let data='';
    response.on('data', (chunk) => {
        data+=chunk;
    })

    response.on('end', () => {
        console.log(typeof data);
        let d = JSON.parse(data);
        console.log(data);
        console.log(typeof d);
        console.log(d);
        console.log(d.daten.benutzername);
        
    });

})
.on('error', (error) => {
    console.log(error);
})

var url ="http://localhost:8000/api/benutzer/alle";
var data =''

const a = http.get(url,(response) => {
        
    response.on('data', (chunk) => {
        data+=chunk;
        })

    response.on('end', () => {
            console.log(data);
            var result = JSON.parse(data);
            console.log(result)
            var e = result.daten.find(user => user.benutzername == 'master');
            console.log(e)

        });

    })
.on('error', (error) => {
        console.log(error);
}).end();


}

function test2() {
    var url ="http://localhost:8000/api/benutzer/alle";
    var data =''

    const a= http.get(url,(response) => {
        
    response.on('data', (chunk) => {
        data+=chunk;
        })

    response.on('end', () => {
            //console.log(data);
            result = JSON.parse(data);
            return result;

        });

    })
.on('error', (error) => {
        console.log(error);
}).end();

console.log(a);

};



async function test3() {
    var str="";
    var test=""
  
  callback = function(response) {

        response.on('data', function (chunk) {
              str += chunk;
              
        });

        response.on('end', function () {
            console.log("test")
            fs.writeFileSync("./test.json",str);
        });

        //return str;
  }

  while(true) {
      try{
        const a = fs.readFileSync("./test.json", "utf-8")
        return a
      }
      catch {

      }
  }
  
}