import { AuthResult, JWTData } from "../types/auth";

class AuthService {
  constructor() {}
  private static _TOKEN_DATA_KEY = "scjsoa5";

  saveJWTData(token: JWTData) {
    localStorage.setItem(AuthService._TOKEN_DATA_KEY, JSON.stringify(token));
  }

  clearJWTData() {
    localStorage.removeItem(AuthService._TOKEN_DATA_KEY);
  }

  isUserLogedin() {
    return localStorage.getItem(AuthService._TOKEN_DATA_KEY) != null;
  }

  getJWTData(): JWTData | null {
    var json = localStorage.getItem(AuthService._TOKEN_DATA_KEY);
    if (!json) {
      return null;
    }
    return JSON.parse(json) as JWTData;
  }
}

const authService = new AuthService();
export { authService };
