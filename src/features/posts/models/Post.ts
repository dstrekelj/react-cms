import { JsonApiResource } from "../../../cms/model/JsonApiResource";

export interface Post extends JsonApiResource {
  attributes: {
    post: string;
  };
}
