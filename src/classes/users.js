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
            console.log({onLoad,ls:window.localStorage})
            if(onLoad && window.localStorage.userID)
                return await this.info(window.localStorage.userID);

            const userID =  await new Promise((resolve,reject)=>{
                window.FB.getLoginStatus(resp=>{
                    if(resp.status==="connected"){
                        resolve(resp.authResponse.userID)
                    }
                    else reject();
                })
            })
            window.localStorage.setItem("userID",userID)
            console.log(window.localStorage)
            return await this.info(window.localStorage.userID);
        }
        catch(id){
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