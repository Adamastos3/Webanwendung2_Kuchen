const form = document.getElementById("form")

//prototyp
form.addEventListener("submit", (e)=>{
    
    e.preventDefault();
    submitten()
})

function submitten(){
    sessionStorage.setItem("login", 0)
    
    location.href="login.html"
}



