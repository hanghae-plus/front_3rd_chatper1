export const getUserInfoStorage = (key) => {
    return localStorage.getItem(key); 
};
 
export const setUserInfoStorage = (key, userInfo) => {
    localStorage.setItem(key, JSON.stringify(userInfo));
};
  
export const deleteUserInfoStorage = (key) => {
    localStorage.removeItem(key);
}