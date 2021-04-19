const getRequest= require("./../Request/getRequest")
const postRequest= require("./../Request/postRequest")

async function getBenutzerbyId(id){
    let pa="/wba2api/benutzer/gib/"+id;
    const b = await getRequest(pa);
    return b
   
}

async function createBenutzer(data){
    let pa="/wba2api/benutzer";
    const b = await postRequest(pa,data)
    return b.id
}

async function checkBenutzer(data){
    let pa="/wba2api/benutzer/eindeutig"
    const b= await getRequest(pa,data);
    return b.eindeutig;
}

module.exports={
    getBenutzerbyId,
    createBenutzer,
    checkBenutzer,
}