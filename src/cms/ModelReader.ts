export type ModelReaderAttributeMap<T extends object> = Record<
  string,
  (model: T) => string
>;

export interface ModelReaderConstructor<T extends object> {
  new (attributeMap?: ModelReaderAttributeMap<T>): ModelReader<T>;
}

export interface ModelReader<T extends object> {
  getId: (model: T) => string;
  getAttribute: (model: T, attribute: string) => string;
}
