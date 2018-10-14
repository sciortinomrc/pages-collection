import React, { Component } from 'react';
import { connect } from 'react-redux';
import Top from '../Components/Top/Top';
import Scroller from '../Components/Home/Scroller';
import Bottom from '../Components/Bottom';
import Add from '../Components/Add/Add';
import Home from '../Components/Home/Home';
import PagesList from '../Components/Main/PagesList';
import Categories from '../Components/Categories/Categories'
import './App.css';
import {getPageFromAPI, getAccessToken,
  windowResize, changePage, newPage} from  '../State/actions.js'

const mapStateToProps= state=>{
  return {
    database: state.addNewPage.database,
    cards: state.fbApiCall.cards,
    isPending: state.fbApiCall.isPending,
    message: state.fbApiCall.message,
    error: state.fbLogin.error,
    accessToken: state.fbLogin.accessToken,
    size: state.onWindowResize.size,
    open: state.onPageChange.open,
    category: state.onPageChange.chosen_category
  }
 }
const mapDispatchToProps = (dispatch) =>{
  return{
   onApiCall: (url) => dispatch(getPageFromAPI(url)),
   getAccessToken: ()=> dispatch(getAccessToken()),
   onPageChange: (page,category)=>dispatch(changePage(page,category)),
   onWindowResize: (size)=>dispatch(windowResize(size))
    }
  }
class App extends Component {
constructor(){
  super()
  this.state=({
    test: {}
  })
}
componentDidMount(){ 
    //load accessToken    
     this.props.getAccessToken();

     console.log(this.props.accessToken)
      //delayed api call and cards load + set message
   this.props.database.map(record=>{
    this.props.onApiCall(record)
    return record
   })/*
     let url = new URL(`https://graph.facebook.com/${record.id}`),
        params = {access_token: this.props.accessToken, fields:'id,name,picture,fan_count,link'}
     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
     this.props.onApiCall(url)
     return record
     })
   },2000)*/
   
//resize event listener
  window.addEventListener('resize',()=>{
      this.props.onWindowResize([window.innerWidth, window.innerHeight])
    })
  }
//add new Page
  addPage=(obj)=>{
    let url = new URL(`https://graph.facebook.com/${obj.id}`),
        params = {access_token: this.props.accessToken, fields:'id,name,picture,fan_count,link'}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      this.props.onApiCall(url);
  }
//select category
//renders the page based on the state
  returnSwitch=()=>{
      switch(this.props.open){
          case 'home':  return ( <Home key='categories' at={this.props.accessToken} cards={this.props.cards} db={this.props.database} />);
          case 'add': return( <Add addPage={this.addPage} readMessage={this.readStateMessage}/>)
          case 'categories': return( <Categories categories={this.state.database} onPageChange={this.props.onPageChange}/>);
          case 'display-all': return ( <PagesList category='all' cards={this.props.cards} db={this.state.database}/> )
          case 'display-category': return (<PagesList category={this.props.category} cards={this.props.cards} db={this.state.database}/>)
          default: return( <h1> ... The page is Loading ...</h1> )
      }
  }
 //  window.FB.api('/1868643320130834',(response)=>{
  apiTest=()=>{
    window.FB.api('/me',(response)=>{
      this.setState({test:response})
      console.log(this.state)
    }
  )
  }
//render method
  render() {
      
      const { accessToken }=this.props;
      return(
        accessToken? (
          <div className="App d-block w-100 m-0 p-0">
            <Top />
              <div className="d-flex flex-column pt">
                  <Scroller>
                    {this.returnSwitch()}
                  </Scroller>
                  <Bottom height={this.props.size[1]} />
              </div>
          </div>
          ):
        (
          <h1 className="text-center mt-5">.... WAITING AUTHORIZATION FROM FACEBOOK .... </h1>
        )
        )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(App);