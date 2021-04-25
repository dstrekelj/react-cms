export interface JsonApiResource {
  id: string;
  type: string;
  attributes: Record<string, any>;
  relationships?: object;
  included?: JsonApiResource[];
}
