const {FB} = window;

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
            const userInfo = await fetch("/api/users/"+userID,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(userInfo.status!==200) throw new Error();
            return await userInfo.json();
        }
        catch(e){
            if(e.status===400){
                await this.signup(userID);
                return await this.info(userID);
            }
            console.log(e);
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

    async getFacebookLoginStatus(){
        return new Promise((resolve)=>{
            FB.getLoginStatus(({authResponse,status})=>{
                if(status==="connected")
                    resolve(authResponse.userID);
                if(status!=="connected")
                    resolve(null);
            })
        })
    }

    async loginWithFacebook(){
        return new Promise((resolve,reject)=>{
            setTimeout(reject,60000)
            FB.login(({authResponse,status})=>{
                if(status==="connected")
                    resolve(authResponse.userID);
                if(status!=="connected")
                    reject()
            })
        })
    }

    async getFacebookUserInfo(id){
        return new Promise(resolve=>{
            FB.api(`/${id}`,user=>{
                resolve(user);
            })
        })
    }

    async ensureUserIsConnectedWithFacebook(){
        const id = await getFacebookUserInfo()
        if(id) return id;
        if(!id){
            await this.loginWithFacebook();
            return await this.ensureUserIsConnectedWithFacebook();
        }
    }

    async login(onLoad=false){
        try{
            if(onLoad && localStorage.userID && localStorage.timestamp)
                return await this.info(localStorage.userID);
            
            if(onLoad && !localStorage.timestamp) return;

            const userID = await this.ensureUserIsConnectedWithFacebook();

            localStorage.setItem("userID",userID);
            localStorage.setItem("timestamp",(Date.now()+3600000).toString());

            const pagesifyUserInfo = await this.info(userID);
            const facebookUserInfo = await this.getFacebookUserInfo(userID);

            return {...pagesifyUserInfo,...facebookUserInfo};
        }
        catch(e){
            console.log(e);
        }
    }

    logout(){
        try{
            FB.logout();
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