import { ModelReader, ModelReaderAttributeMap } from "./ModelReader";
import { JsonApiResource } from "./model/JsonApiResource";
import { safeGet } from "../common/utils";

export class JsonApiModelReader<T extends JsonApiResource>
  implements ModelReader<T> {
  attributeMap: ModelReaderAttributeMap<T> | undefined;

  constructor(attributeMap?: ModelReaderAttributeMap<T>) {
    this.attributeMap = attributeMap;
  }

  getAttribute(model: T, attribute: string) {
    if (this.attributeMap && this.attributeMap[attribute] !== undefined) {
      return this.attributeMap[attribute](model);
    }

    switch (attribute) {
      case "id":
        return String(safeGet(model, "id"));
      case "type":
        return String(safeGet(model, "type"));
      default:
        return String(safeGet(model, "attributes." + attribute));
    }
  }

  getId(model: T) {
    return String(model.id);
  }
}
