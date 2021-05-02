function innerSafeGet(
  object: Record<string, any>,
  properties: string[],
  defaultValue?: any,
): any {
  if (!object || properties.length === 0) {
    return object ?? defaultValue;
  }

  try {
    return innerSafeGet(
      object[properties[0]],
      properties.slice(1),
      defaultValue,
    );
  } catch (error) {
    return defaultValue;
  }
}

export function safeGet(
  object: Record<string, any>,
  property: string,
  defaultValue?: any,
) {
  try {
    return innerSafeGet(object, property.split("."), defaultValue);
  } catch (error) {
    return defaultValue;
  }
}
