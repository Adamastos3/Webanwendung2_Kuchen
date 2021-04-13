const sites=["Shop","Individuelles Sortiment","Reguläres Sortiment","Warenkorb","Kasse"]
const title=document.title;

function changeToLogoTwo(){
    let a = document.getElementById("logo")
    a.src=""
    a.id=""
}

function changeToOriginal(){
    let a = document.getElementById("logo")
    if (a == undefined){
        a.src=""
        a.id=""
    }
    

}

function checkWarenkorb(){
    let r = sessionStorage.getItem("regular")
    let i = sessionStorage.getItem("Individual")

    if ((r != "undefined") || (i!="n")){
        changeToLogoTwo()
    }
    else{
        changeToOriginal()
    }
}

for (let z =0;z<sites.length;z++){
    if(title==sites[z]){
        if(title="Warenkorb"){
            checkWarenkorb()
        }
        else{
            changeToLogoTwo()
        }
        
    }
}