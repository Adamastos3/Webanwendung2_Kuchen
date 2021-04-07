const form = document.getElementById("form")

//prototyp
form.addEventListener("submit", (e)=>{
    
    e.preventDefault();
    sessionStorage.setItem("login", 1)
    
    location.href="login.html"
})



