import { ModelReader } from "../../../cms/ModelReader";

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
      {props.items.map((listItem, index) => (
        <div key={index}>
          {props.reader.getAttribute(props.data, listItem.mapTo)}
        </div>
      ))}
    </div>
  );
}

export { DataView };
