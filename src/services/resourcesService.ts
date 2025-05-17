import { APIBase } from "./base";

class ResourcesService extends APIBase {


  validateToken(token: string) {
    return this.fetchJSON("/api/auth/login", {
      method: "POST",
    }, token);
  }
}

export default new ResourcesService();
