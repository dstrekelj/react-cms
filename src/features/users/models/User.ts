import { JsonApiResource } from "../../../cms/model/JsonApiResource";

export interface User extends JsonApiResource {
  attributes: {
    email: string;
    username: string;
  };
}
