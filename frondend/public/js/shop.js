const regular= document.getElementById("");
const individuel= document.getElementById("");


//init seesionstorage
if (sessionStorage.length==0) {
    sessionStorage.setItem("regular",null)
    sessionStorage.setItem("Individual", null)
}


function sendOn(a) {
    if (a =="r") {
        location.href="/sortimentR"
    }
    if(a =="i") {
        location.href="/sortimentI"
    }
}