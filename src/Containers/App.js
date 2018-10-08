import React, { Component } from 'react';
import Top from '../Components/Top/Top';
import Scroller from '../Components/Home/Scroller';
import Bottom from '../Components/Bottom';
import Add from '../Components/Add/Add';
import './App.css';

class App extends Component {
// electron.js..

constructor(){
  super()
    this.state=({
      accessToken:'',
      logged: true,
      open: 'add',
      categoryArray:[
      {
        id: '1868643320130834',
        category: 'natura'
      }/*,
      {
        id: '718361521697095',
        category: 'natura'
      },
      {
        id: '1169644526470881',
        category: 'fantasia'
      },
      {
        id: '137492556866190',
        category: 'trasformismo'
      },
      {
        id: '1683822428328710',
        category: 'trasformismo'
      },
      {
        id: '354760301630118',
        category: 'ignoranza'
      },
*/
      ],
      cards:[],
      size: [window.innerWidth, window.innerHeight],
      }
      ) 
    }
  

componentWillMount(){
   window.FB.getLoginStatus((response)=>{
      this.setState({accessToken: response.authResponse.accessToken});
    })
    const {open, accessToken, cards, categoryArray}=this.state;
    setTimeout(()=>{
      categoryArray.map(item=>{
          this.fbapiCall(item)
        })
      },500)
    setTimeout(()=>console.log(this.state),1000)

}
componentDidMount(){
  window.addEventListener('resize',()=>{
    this.setState({size:[window.innerWidth, window.innerHeight]})
  })
}
//change state open to navigate around the pages
changePage=(page)=>{
  this.setState({open: page})
}
//async fetch pages
getPages=(url,category)=>{
  let objPush;
  fetch(url)
  .then(resp=> resp.json())
  .then(data=> {objPush={
      name: data.name,
      id: data.id,
      picture: data.picture,
      link: data.link,
      likes: data.fan_count,
      category: category
  }})
  setTimeout(()=>{this.state.cards.push(objPush)},200)
}

//api call
fbapiCall=(item)=>{
    let url = new URL(`https://graph.facebook.com/${item.id}`),
    params = {access_token: this.state.accessToken, fields:'id,name,link,fan_count,picture'}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    this.getPages(url,item.category);
   }
//add page object to categoryArray in state
addPage=(id,category)=>{
  const newPage={id,category};
  let stateArray=this.state.categoryArray;
  stateArray.push(newPage);
  this.setState({categoryArray: stateArray})
}
//renders the page based on the state
returnSwitch=()=>{
  const {open,accessToken,categoryArray, cards}=this.state;
    switch(open){
        case 'home':  return ( <Scroller key='categories'  at={accessToken} cards={cards} categories={categoryArray} />);
        case 'add': return( <Add onAddPage={this.addPage} at={accessToken}/>)
        default: return( <p> Homepage</p>);
      }
  }

//render method
  render() {
    const {open, logged}=this.state;
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