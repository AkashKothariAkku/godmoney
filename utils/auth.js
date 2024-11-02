import Cookies from 'js-cookie';

export const getAuthToken = () => localStorage.getItem('token'); 
export const getUserRole = () => Cookies.get('userRole'); 
export const isAuthenticated = () => !!getAuthToken(); 