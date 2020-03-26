class Visits{
    constructor(){
        this.list=[];
    }

    async recordVisit(){
        try{
            await fetch("/api/visits",{
                method:"POST"
            })
            return true;
        }
        catch(e){
            throw e
        }
    }

    async all(){
        try{
            const request = await fetch("/api/visits",{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(request.status!==200) throw new Error();
            this.list = await request.json();
        }
        catch(e){
            throw e
        }
    }
    getAll(){
        return this.list
    }
    
}
export default Visits;