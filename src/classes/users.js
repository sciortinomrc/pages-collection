class Users{

    constructor(){
        this.list = []
    }

    async all(){
        try{
            const request = await fetch("/api/users",{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(request.status!==200) throw new Error();
            this.list = await request.json();
            return;
        }
        catch(e){
            throw e
        }
    }
    getAll(){
        return this.list;
    }



    async info(userID){
        try{
            console.log("Getting info")
            const fbuserInfo = new Promise(resolve=>{
               window.FB.api(`/${userID}`,user=>{
                   resolve(user);
               })
            })
            const userInfo = await fetch("/api/users/"+userID,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(userInfo.status!==200) throw new Error();
            const user = await userInfo.json();
            return {...user,...fbuserInfo}
        }
        catch(e){
            throw userID;
        }
    }
    async signup(id){
        try{
            const userReq = await fetch("/api/users/"+id,{
                method:"POST"
            })
            if(userReq.status!==200) throw await userReq.json();
            return await userReq.json();
        }
        catch(e){
            throw e
        }
    }
    async login(onLoad=false){
        try{
            console.log({onLoad})
            if(onLoad && localStorage.userID && localStorage.timestamp)
                return await this.info(localStorage.userID);
            
            if(onLoad && !localStorage.timestamp) return;

            console.log("loggin into fb")
            const userID =  await new Promise((resolve,reject)=>{
                window.FB.getLoginStatus(resp=>{
                    if(resp.status==="connected"){
                        resolve(resp.authResponse.userID)
                    }
                    else reject();
                })
            })
            localStorage.setItem("userID",userID);
            localStorage.setItem("timestamp",(Date.now()+3600000).toString());

            return await this.info(localStorage.userID);
        }
        catch(id){
            console.log({id})
            try{
                return await this.signup(id);
            }
            catch(e){
                throw e;
            }
        }
    }
    logout(){
        try{
            window.FB.logout();
            localStorage.clear();
            return null
        }
        catch(e){
            throw e
        }
    }
    async updateFavourites(userInfo,pageId){
        try{
            await fetch(`/api/users/${userInfo.id}/favourites/update`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({userInfo,pageId})
            })
            return true
        }
        catch(e){
            throw e
        }
    }
}
export default Users;