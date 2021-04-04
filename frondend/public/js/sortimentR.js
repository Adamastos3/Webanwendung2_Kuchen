

function store(a) {
    let elem = a.value;
    let regular = sessionStorage.getItem("regular").split(",")
    regular.push(elem);
    sessionStorage.setItem("regular", regular)
    console.log(sessionStorage)
    storeAnzeigen()
    
}







//Später einsetzen
/*
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost/8000/api/produkte/alle')
request.onload=function() {
    var data = JSON.parse(request.responseText);
    console.log(data);
}
request.send();

function setzenHtml(){

}

function store(a) {
    let elem = document.getElementById(a).value;
    let regular = sessionStorage.getItem("regular").split(",")
    regular.push(elem);
    sessionStorage.setItem("regular", regular)
    
}



*/