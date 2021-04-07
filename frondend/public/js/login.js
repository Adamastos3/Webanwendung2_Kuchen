

//prototyp
document.addEventListener("keyup", (e)=>{
    

    if(e.keyCode===13){

        e.preventDefault();
        sessionStorage.setItem("login", 1)
    
        location.href="account.html"
    };
  
})



