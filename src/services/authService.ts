import { APIBase } from "./base";

class AuthService extends APIBase {
  validateToken(token: string) {
    return this.fetchJSON("/auth/login", {
      method: "POST",
    }, token);
  }
  async  asdfsd() {

  }
}

export default new AuthService();
