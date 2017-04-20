class Auth {
// Authenticate a URLSearchParams. Save a token string in localStorage
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

// Store userID as a string in localStorage
  static storeUserID(id) {
    localStorage.setItem('userID', id);
  }

// Check if user is authenticated - check for token in localStorage
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

// Deauthenticate user - remove token from localStorage
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

// Get a token value
  static getToken() {
    return localStorage.getItem('token');
  }

// Get a userID value
  static getUserID() {
    return localStorage.getItem('userID');
  }
}

export default Auth;
