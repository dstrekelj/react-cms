import { FC } from "react";
import { ModelReader } from "../../../cms/ModelReader";
import * as components from "./components";

const componentMap: Record<string, FC> = components;

type ViewItem = {
  mapTo: string;
  component: string;
};

type DataViewProps<T extends object> = {
  data: T;
  reader: ModelReader<T>;
  items: ViewItem[];
};

function DataView<T extends object>(props: DataViewProps<T>) {
  return (
    <div>
      {props.items
        .filter((listItem) => componentMap[listItem.component])
        .map((listItem, index) => {
          const Component = componentMap[listItem.component];

          return (
            <Component key={index}>
              {props.reader.getAttribute(props.data, listItem.mapTo)}
            </Component>
          );
        })}
    </div>
  );
}

export { DataView };
