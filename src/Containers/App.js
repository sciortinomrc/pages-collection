import React, { Component } from 'react';
import { connect } from 'react-redux';
import Top from '../Components/Top/Top';
import Scroller from '../Components/Home/Scroller';
import Bottom from '../Components/Bottom';
import Add from '../Components/Add/Add';
import './App.css';
import {setLoginState, getPageFromAPI, getAccessToken} from  '../State/actions.js'

const mapStateToProps= state=>{
  return {
    logged: state.onLogin.logged,
    cards: state.fbApiCall.cards,
    isPending: state.fbApiCall.isPending,
    message: state.fbApiCall.message,
    error: state.fbLogin.error,
    accessToken: state.fbLogin.accessToken
  }
 }
const mapDispatchToProps = (dispatch) =>{
  return{
   onLoginChange: (loginStatusChange) =>{
     dispatch (setLoginState(loginStatusChange));
  },
   onApiCall: (url) => dispatch(getPageFromAPI(url)),
   getAccessToken: ()=> dispatch(getAccessToken())
  }
}

class App extends Component {
constructor(){
  super()
    this.state=({
      open: 'home',
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
      size: [window.innerWidth, window.innerHeight],
      }
      ) 
    }
componentDidMount(){ 
    //load accessToken
    this.props.getAccessToken();
    console.log(this.props.accessToken)
    //delayed api call and cards load + set message
    setTimeout(()=>{
      this.state.database.map(record=>{
                   let url = new URL(`https://graph.facebook.com/${record.id}`),
                      params = {access_token: this.props.accessToken, fields:'id,name,picture,fan_count,link'}
                   Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                   this.props.onApiCall(url)
                   })
    },2000)

  //resize event listener
    window.addEventListener('resize',()=>{
      this.setState({size:[window.innerWidth, window.innerHeight]})
    })/*
  //display home
    setTimeout(()=>{this.setState({open: 'home'})},2000)*/
 }
//add new Page
  addPage=(obj)=>{
    let url = new URL(`https://graph.facebook.com/${obj.id}`),
        params = {access_token: this.state.accessToken, fields:'id,name,picture,fan_count,link'}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      this.props.onApiCall(url);
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
          case 'home':  return ( <Scroller key='categories' at={this.props.accessToken} cards={this.props.cards} db={this.state.database} />);
          case 'add': return( <Add addPage={this.addPage} readMessage={this.readStateMessage}/>)
          default: return( <h1> ... The page is Loading ...</h1> )
      }
  }
//render method
  render() {
    const {accessToken, open, database}=this.state;
    const {logged, onLoginChange, cards }=this.props;
      return(
          <div className="App d-block w-100 m-0 p-0">
            <Top width={this.state.size[0]} logged={logged} onLoginChange={onLoginChange} onPageChange={this.changePage} />
              <div className="d-flex flex-column justify-content-end pt">
                  {this.returnSwitch()}
                  <Bottom height={this.state.size[1]} />
              </div>
          </div>
        )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(App);