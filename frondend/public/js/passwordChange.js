const forme = document.getElementById("form")

//prototyp
forme.addEventListener("submit", (e)=>{
    
    e.preventDefault();
    submitten()
})

function submitten(){
    sessionStorage.setItem("login", 0)
    
    //console.log(checkPassword())

    if(checkPassword()){
        location.href="login.html"
    }
}

function checkPassword(){
    let a = document.getElementById("passwordNew")
    let b = document.getElementById("passwordNew2")

    if (a.value.length <8){
        window.alert("Passwort ist zu kurz (min. 8 Zeichen)")
        document.forms.form.reset()
        return false
    }
    else{
        if (a.value == b.value){
            return true
        }
        else{
            window.alert("Die Passwörter sind nicht gleich")
            document.forms.form.reset()
            return false
        }
    }
}



