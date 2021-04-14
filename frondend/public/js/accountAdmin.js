//prototype
function logout(){
    sessionStorage.setItem("login",0)
    sessionStorage.setItem("admin",0)
    sessionStorage.clear
    location.href="login.html"
}