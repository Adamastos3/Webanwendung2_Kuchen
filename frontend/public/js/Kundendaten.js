
function erledigt(id) {
    console.log(id)
    let element = document.getElementById(id);
    //console.log(element)
    element.parentNode.removeChild(element);
    //Es fehl noch das entfernen aus dem sessionstore
}

function sendOn(){
    location.href="kundenChange.html"
}
