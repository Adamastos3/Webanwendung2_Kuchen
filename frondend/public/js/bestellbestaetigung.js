setTimeout(killStorage(), 3000)

function killStorage() {
    sessionStorage.setItem("regular", "undefined")
    sessionStorage.setItem("Individual", "n")
}