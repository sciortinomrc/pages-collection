import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from '../Components/ErrorBoundary';
import '../css/fontello.css';
import '../css/animation.css';
import Top from '../Components/Top/Top'; import Scroller from '../Components/Home/Scroller'; 
import Bottom from '../Components/Bottom'; import Add from '../Components/Add/Add'; 
import Home from '../Components/Home/Home';import Card from '../Components/Main/Card'; 
import DisplayPages from '../Components/Main/DisplayPages';
import './App.css';
import {getPageFromAPI, windowResize, changePage, setPagesDatabase, setLoginState} from  '../State/actions.js'

const mapStateToProps= state=>{
  return {
    user: state.onLogin.loggedUser,
    database: state.addNewPage.database,
    cards: state.fbApiCall.cards,
    isPending: state.fbApiCall.isPending,
    message: state.fbApiCall.message,
    size: state.onWindowResize.size,
    open: state.onPageChange.open,
    category: state.onPageChange.chosen_category,
    card: state.displaySingleCard.card
  }
 }
const mapDispatchToProps = (dispatch) =>{
  return{
   setDB: (database)=> dispatch(setPagesDatabase(database)),
   onApiCall: (cards) => dispatch(getPageFromAPI(cards)),
   onPageChange: (page,category)=>dispatch(changePage(page,category)),
   onWindowResize: (size)=>dispatch(windowResize(size)),
   setLoginState: (userId)=>dispatch(setLoginState(userId))
    }
  }
class App extends Component {
constructor(){
  super()
  this.state=({
   userName: ''
  })
}
componentWillMount(){
const APPID="899425356926402";
  window.fbAsyncInit = function() {
    window.FB.init({
      appId      : APPID,
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
      
    window.FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2&appId=493486697820891&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
componentDidMount(){ 
  fetch('https://peaceful-everglades-81846.herokuapp.com/')
  .then(resp=>resp.json())
  .then(data=>{
      this.props.setDB(data.db)
      this.props.onApiCall(data.cards)
  })
//resize event listener
  window.addEventListener('resize',()=>{
      this.props.onWindowResize([window.innerWidth, window.innerHeight])
    })
  
}
//facebook login
 checkLoginState=() => {
   window.FB.getLoginStatus((response)=>{
   if(response.status==="connected"){
      this.props.setLoginState(response.authResponse.userID)
      window.FB.api("/me",(resp)=>this.setState({userName: resp.name.split(" ")[0]}))
   }
   else{
      window.FB.login((response)=>{
          console.log(response)
          if(response.status==="connected"){
            this.props.setLoginState(response.authResponse.userID)
            window.FB.api("/me",(resp)=>this.setState({userName: resp.name.split(" ")[0]}))
         }
      }, {scope: 'public_profile,email'})
   }
  }, {scope: 'public_profile,email'});
}
  resetState=()=>{
    this.setState({userName: ""})
  }

//display single card
  displayReceivedCard=()=>{
    const {card,database}=this.props;
    const record=database.filter(record=>{
     return record && record.id===card.id

     })
    return(
          <Card
            id={card.id}
            name={card.name}
            fan_count={card.fan_count}
            picture={card.picture.data.url}
            link={card.link}
            favourites={record[0].favourite}
            category={record[0].category}
            country={record[0].country}
          />
         )
  } 
//filter favourites from database
  filterFavourites=()=>{
       return(
         this.props.database.filter(record=>{
            return this.props.user.fav.some(fav=>fav===record.id)
            })
        ) 
  }


//renders the page based on the state
  returnSwitch=()=>{
    const {open, cards, database, onPageChange, readStateMessage, user, category} = this.props;
      switch(open){
          case 'home':  return ( <Home category='categories' cards={cards} db={database} user={user} onPageChange={onPageChange}/>);
          case 'add': return( <Add readMessage={readStateMessage}/>)
          case 'display': return ( <DisplayPages category={category} cards={cards} database={database}/> )
          case 'card': return (<div className="d-flex m-auto justify-content-center">{this.displayReceivedCard()}</div>)
          case 'favourites': return( <DisplayPages category='favourites' cards={cards} database={this.filterFavourites()}/>)
          default: return( <h1> ... The page is Loading ...</h1> )
      }
  }
//render method
  render() {
    return(
      <div className="App d-block w-100 m-0 p-0">
        <Top fblogin={this.checkLoginState} userName={this.state.userName} reset={this.resetState}/>
          <div className="d-flex flex-column pt">
            {
              this.props.database.length?
              (
               <ErrorBoundary>  
                <Scroller>
                {this.returnSwitch()}
                </Scroller>
               </ErrorBoundary>
                ):
              (<div id="loading" className="display-flex full-screen">
                <i className="fab icon-spin5 animate-spin margin-auto"></i>
                <h1>Getting data from Facebook</h1>
              </div>)
            }  
              <Bottom height={this.props.size[1]} />
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(App);