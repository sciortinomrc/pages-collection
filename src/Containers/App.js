import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from '../Components/ErrorBoundary';
import '../css/fontello.css';
import '../css/animation.css';
import Top from '../Components/Top/Top'; import Scroller from '../Components/Home/Scroller'; 
import Bottom from '../Components/Bottom'; import Add from '../Components/Add/Add'; 
import Home from '../Components/Home/Home';import Card from '../Components/Main/Card'; 
import DisplayPages from '../Components/Main/DisplayPages'; import UserPanel from "../Components/User/UserPanel";
import './App.css';
import {windowResize, changePage, setPagesDatabase, setLoginState} from  '../State/actions.js'

const mapStateToProps= state=>{
  return {
    user: state.onLogin.loggedUser,
    database: state.addNewPage.database,
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
   onPageChange: (page,category)=>dispatch(changePage(page,category)),
   onWindowResize: (size)=>dispatch(windowResize(size)),
   setLoginState: (userId)=>dispatch(setLoginState(userId))
    }
  }
class App extends Component {
constructor(){
  super()
  this.state=({
   userName: '',
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

}
componentDidMount(){ 
  fetch('https://peaceful-everglades-81846.herokuapp.com/')
  .then(resp=>resp.json())
  .then(data=>{
      this.props.setDB(data.db)
  })
// resize event listener
  window.addEventListener('resize',()=>{
      this.props.onWindowResize([window.innerWidth, window.innerHeight])
    })

}
//facebook login
   fbLogin=()=>{
      window.FB.getLoginStatus(resp=>{

      if(resp.status==="connected"){
         window.FB.api("/"+resp.authResponse.userID, user=>{

            this.props.setLoginState(user);
            this.setState({
               userName: user.name.split(" ")[0]
            })
         })
      }
      else{
         window.FB.login((response)=>{this.fbLogin();});

      }
      })
   }

  resetState=()=>{
    this.setState({userName: ""})
  }

//display single card
  displayReceivedCard=()=>{
  const {card}=this.props;
    return(
          <Card
            id={card.id}
            name={card.name}
            picture={card.picture}
            url={card.url}
            favourites={card.favourite}
            category={card.category}
            country={card.country}
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
    const {open, database, onPageChange, readStateMessage, user, category} = this.props;
      switch(open){
          case 'home':  return ( <Home category='categories' db={database} user={user} onPageChange={onPageChange}/>);
          case 'add': return( <Add readMessage={readStateMessage}/>)
          case 'display': return ( <DisplayPages category={category} database={database}/> )
          case 'card': return (<div className="d-flex m-auto justify-content-center">{this.displayReceivedCard(this.state.cardToDisplay)}</div>)
          case 'favourites': return( <DisplayPages category='favourites' database={this.filterFavourites()}/>)
          case 'user': return(<UserPanel database={database} user={user}/>)
          default: return( <h1> ... The page is Loading ...</h1> )
      }
  }

//render method
  render() {
    return(
      <div className="App d-block w-100 m-0 p-0">
        <Top fblogin={this.fbLogin} userName={this.state.userName} reset={this.resetState} />
          <div className="d-flex flex-column pt">
            {
              (this.props.database.length)?
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