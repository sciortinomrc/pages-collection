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
            return {...userInfo,...fbuserInfo}
        }
        catch(e){
            throw e;
        }
    }

    async login(){
        try{
            const userID = await new Promise((resolve,reject)=>{
                window.FB.getLoginStatus(resp=>{
                    if(resp.status==="connected"){
                        resolve(resp.authResponse.userID)
                    }
                    else reject();
                })
            })
            return await this.info(userID);
        }
        catch(e){
            return await this.login();
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