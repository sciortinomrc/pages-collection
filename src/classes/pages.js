class Pages{
    constructor(){
        this.list=[];
    }

    async all(){
        try{
            const request = await fetch ("/api/pages",{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(request.status!==200) throw new Error();
            const pages = await request.json();
            this.list=pages;
        }
        catch(e){
            throw e;
        }

    }
    getAll(){
        return this.list;
    }
    get(id){
        return this.list.filter(page=>page.id==id)[0];
    }
    async updateFavourites(id,count,direction){
        try{
            const request = await fetch("/api/pages/"+id+"/favourites/update?current="+count+"&add="+direction,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(request.status!==200) throw new Error()
            return
        }
        catch(e){
            throw e
        }
    }
    async delete(id){
        try{
            const request = await fetch("/api/pages/"+id,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(request.status!==200) throw new Error();
            return;
        }
        catch(e){
            throw e
        }

    }
    async create(pageInfo){
        try{
            const request = await fetch("/api/pages",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(pageInfo)
            })
            if(request.status!==200) throw new Error();
            return;
        }
        catch(e){
            throw e
        }
    }
}

export default Pages;