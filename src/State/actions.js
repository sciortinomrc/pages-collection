import {SET_LOGIN_STATE,
		REQUEST_PAGE_PENDING,
		REQUEST_PAGE_SUCCESS,
		REQUEST_PAGE_FAILED,
		GET_ACCESS_SUCCESS,
		WINDOW_RESIZE,
		CHANGE_PAGE
		} from './constants';
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

export const changePage = (page)=>({type: CHANGE_PAGE, payload: page})