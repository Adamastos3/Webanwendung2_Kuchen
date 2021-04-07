const form = document.getElementById("form")

//prototyp
form.addEventListener("submit", (e)=>{
    
    e.preventDefault();
    window.alert("Danke, dass Sie uns kontaktiert haben")
    
    location.href="start.html"
})



