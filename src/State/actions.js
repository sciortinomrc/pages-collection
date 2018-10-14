import {SET_LOGIN_STATE, REQUEST_PAGE_PENDING, REQUEST_PAGE_SUCCESS, 
		REQUEST_PAGE_FAILED, GET_ACCESS_SUCCESS, WINDOW_RESIZE,
		CHANGE_PAGE, CATEGORY_CHOICE, ADD_PAGE_FAILED,
		ADD_PAGE_SUCCESS } from './constants';
export const setLoginState = (loggedIn) => ({
	type: SET_LOGIN_STATE,
	payload: loggedIn
})
export const getAccessToken = (at) => (dispatch) =>{
	window.FB.getLoginStatus((response)=>{
     dispatch({type: GET_ACCESS_SUCCESS, payload: response.authResponse.accessToken});
    })
}
export const getPageFromAPI = (url) => (dispatch) => {
	dispatch({ type: REQUEST_PAGE_PENDING, payload: url});
	fetch(url)
	.then(response=>response.json())
	.then(data=> (data.error)
					? dispatch({
						type: REQUEST_PAGE_FAILED,
						payload: 'Something went wrong, Unable to add the page'
					})
					: dispatch({
						type: REQUEST_PAGE_SUCCESS,
						payload: data
					})
		)
	.catch(error=> dispatch({ type: REQUEST_PAGE_FAILED, payload: error}))
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

	