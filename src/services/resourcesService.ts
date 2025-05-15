import { APIBase } from "./base";

class ResourcesService extends APIBase {
  testBase(token: string) {
    return this.fetchJSON("/api/test", token);
  }
}

export default new ResourcesService();
