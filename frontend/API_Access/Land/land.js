const getRequest= require("../Request/getRequest")
const postRequest= require("../Request/postRequest")

async function getLandById(id) {
    const pa='/wba2api/land/gib/'+id    
    const b= getRequest(pa)

}

async function createLand(data) {
    const pa ="/wba2api/land"
    const b = await postRequest(pa,data)
}



module.exports={
    getLandById,

}