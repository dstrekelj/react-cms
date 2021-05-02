import { ComponentClass } from "react";
import { useForm, Controller } from "react-hook-form";
import { ModelReader } from "../../../cms/ModelReader";
import * as components from "./components";

const componentMap: Record<string, ComponentClass> = components;

type FormItem = {
  name: string;
  component: string;
  componentProps?: object;
};

type DataFormProps<T extends object> = {
  data: T;
  reader: ModelReader<T>;
  items: FormItem[];
};

function DataForm<T extends object>(props: DataFormProps<T>) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {props.items
        .filter((listItem) => componentMap[listItem.component])
        .map((listItem, index) => {
          const Component = componentMap[listItem.component];

          return (
            <Controller
              key={listItem.name}
              name={listItem.name}
              control={control}
              defaultValue={props.reader.getAttribute(
                props.data,
                listItem.name,
              )}
              render={({ field }) => (
                <Component
                  {...listItem.componentProps}
                  {...field}
                  key={index}
                />
              )}
            />
          );
        })}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export { DataForm };
