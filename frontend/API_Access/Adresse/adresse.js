const getRequest= require("./../Request/getRequest")
const postRequest= require("./../Request/postRequest")

async function getAddressbyId(id){
    let pa="/wba2api/adresse/gib/"+id;
    const b = await getRequest(pa);
    return b
   
}

async function createAddress(data){
    let pa="/wba2api/adresse";
    const b = await postRequest(pa,data)
    console.log(b)
    return b.id
}

module.exports={
    getAddressbyId,
    createAddress,
}