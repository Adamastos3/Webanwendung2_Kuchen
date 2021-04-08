

//prototyp
document.addEventListener("keydown", (e)=>{
    

    if(e.keyCode === 13){
        console.log("tetetet")

        e.preventDefault();
        var a= document.getElementById("username").value;
        if(a=="admin"){
            if(document.getElementById("pass").value="admin"){
                sessionStorage.setItem("admin",1);
                location.href="accountAdmin.html";
            }
            else{
                alert("Falsche Eingaben. Bitte versuchen Sie es nochmal")
                document.forms.form.reset();

            }
        }
        else{
            sessionStorage.setItem("login", 1)
            console.log("ende")
            location.href="account.html"
        }
        
    
        
    };
  
})



