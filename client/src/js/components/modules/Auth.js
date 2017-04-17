class Auth {
// Authenticate a URLSearchParams. Save a token string in localStorage
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

// Check if user is authenticated - check for token in localStorage
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

// Deauthenticate user - remove token from localStorage
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

// Get a token value
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
