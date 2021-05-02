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
      default: {
        const [fragment, ...rest] = attribute.split(".");
        const relationship = this.getRelationship(model, fragment);

        return String(
          safeGet(
            relationship ?? model,
            "attributes." + (relationship ? rest.join(".") : attribute),
          ),
        );
      }
    }
  }

  getId(model: T) {
    return String(model.id);
  }

  private getRelationship(model: T, name: string) {
    const relationship = safeGet(model, "relationships." + name);

    if (!relationship) {
      return null;
    }

    const relationshipModel = model.included?.find(
      (include) =>
        relationship?.data?.id === include.id &&
        relationship?.data?.type === include.type,
    );

    return relationshipModel ?? null;
  }
}
