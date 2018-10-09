import React, { Component } from 'react';
import Top from '../Components/Top/Top';
import Scroller from '../Components/Home/Scroller';
import Bottom from '../Components/Bottom';
import Add from '../Components/Add/Add';
import './App.css';

class App extends Component {
constructor(){
  super()
    this.state=({
      accessToken:'',
      logged: true,
      open: '',
      database:[
        {
          id: '1868643320130834',
          category: 'natura',
          favourite: 0
        },
        {
          id: '718361521697095',
          category: 'natura',
          favourite: 0
        }/*,
        {
          id: '1169644526470881',
          category: 'fantasia',
          favourite: 0
        },
        {
          id: '137492556866190',
          category: 'trasformismo',
          favourite: 0
        },
        {
          id: '1683822428328710',
          category: 'trasformismo',
          favourite: 0
        },
        {
          id: '354760301630118',
          category: 'ignoranza',
          favourite: 0
        },*/
      ],
      cards:[],
      size: [window.innerWidth, window.innerHeight],
      message: ''
      }
      ) 
    }
componentDidMount(){
//load accessToken
   window.FB.getLoginStatus((response)=>{
      this.setState({accessToken: response.authResponse.accessToken});
    })
   console.log(this.state.accessToken)
//delayed api call and cards load + set message
   setTimeout(()=>{
    this.state.database.map(record=>{
    let url = new URL(`https://graph.facebook.com/${record.id}`),
       params = {access_token: this.state.accessToken, fields:'id,name,picture,fan_count,link'}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
    .then(response=>response.json())
    .then(data=>this.state.cards.push(data) )
    })
   },1000)
//resize event listener
  window.addEventListener('resize',()=>{
    this.setState({size:[window.innerWidth, window.innerHeight]})
  })
//display home
  setTimeout(()=>{this.setState({open: 'home'})},2000)
 }
 //add new Page
addPage=(obj)=>{
  let url = new URL(`https://graph.facebook.com/${obj.id}`),
      params = {access_token: this.state.accessToken, fields:'id,name,picture,fan_count,link'}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
      if(data.error){
        this.setState({message: 'Something went wrong - The page has not been added'})
      }else{
        let tempArray=this.state.database;
        tempArray.push(obj);
        this.setState({database:tempArray})
        this.state.cards.push(data)
        this.setState({message: 'The page has been added'})
      }
    })
  
}
//change state open to navigate around the pages
changePage=(page)=>{
  this.setState({open: page})
}
//read message
readStateMessage=()=>{
  return this.state.message
}

//renders the page based on the state
returnSwitch=()=>{
    switch(this.state.open){
        case 'home':  return ( <Scroller key='categories' at={this.state.accessToken} cards={this.state.cards} db={this.state.database} />);
        case 'add': return( <Add addPage={this.addPage} readMessage={this.readStateMessage}/>)
        default: return( <h1> ... The page is Loading ...</h1> )
      }
  }

//render method
  render() {
    const {accessToken, open, logged,database}=this.state;
      return(
          <div className="App d-block w-100 m-0 p-0">
            <Top width={this.state.size[0]} logged={logged} onPageChange={this.changePage}/>
              <div className="d-flex flex-column justify-content-end pt">
                  {this.returnSwitch()}
                  <Bottom height={this.state.size[1]} />
              </div>
          </div>
        )
    
  }
}

export default App;