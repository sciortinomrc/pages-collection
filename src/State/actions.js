import {SET_LOGIN_STATE, REQUEST_PAGE_PENDING, REQUEST_PAGE_SUCCESS, 
		REQUEST_PAGE_FAILED, GET_ACCESS_SUCCESS, WINDOW_RESIZE,
		CHANGE_PAGE, CATEGORY_CHOICE, ADD_PAGE_FAILED,
		ADD_PAGE_SUCCESS, ACCESS_TOKEN, DISPLAY_CARD } from './constants';
export const setLoginState = (loggedIn) => ({
	type: SET_LOGIN_STATE,
	payload: loggedIn
})
export const getAccessToken = (at) => (dispatch) =>({
  type: GET_ACCESS_SUCCESS, payload: ACCESS_TOKEN
})
export const getPageFromAPI = (record) => (dispatch) => {
	dispatch({ type: REQUEST_PAGE_PENDING, payload: record});
	let payload;
	window.FB.api('/'+record.id,'get',{access_token:ACCESS_TOKEN, fields:'id,name,fan_count, link, picture'},(response)=>{
		payload=response;
	})
	setTimeout(()=>{
		if(payload.error){
			dispatch({type: REQUEST_PAGE_FAILED, payload: payload.error.message})
		}
		else{
			dispatch({type: REQUEST_PAGE_SUCCESS, payload: payload})
		}
	},1000)
}
export const windowResize = (windowSize) => ({type: WINDOW_RESIZE, payload: windowSize})
export const changePage = (page,chosen_category="")=> {
		if(chosen_category.length){
			return{
				type: CATEGORY_CHOICE,
				payload: {page,chosen_category}	
			}
		}else{
			return{
			type: CHANGE_PAGE,
			payload: page
			}
		}
	
}
export const newPage=(id,category,country,message)=>{
	if(!id)
		return{
			type: ADD_PAGE_FAILED,
			payload: message
		}
	else
		return{
			type: ADD_PAGE_SUCCESS,
			payload: {id,category,country,message}
		}	
}

export const displayCard=(id,name,link,picture,fan_count)=>({
	type: DISPLAY_CARD,
	payload: {id,name,link,picture,fan_count}
})

	