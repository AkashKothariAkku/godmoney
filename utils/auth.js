import Cookies from 'js-cookie';

export const getAuthToken = () => Cookies.get('token'); 
export const getUserRole = () => Cookies.get('userRole'); 
export const isAuthenticated = () => !!getAuthToken(); 