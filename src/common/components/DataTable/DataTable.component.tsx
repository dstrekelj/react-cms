import { FC, useCallback } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { ModelReader } from "../../../cms/ModelReader";
import * as components from "./components";

const componentMap: Record<string, FC> = components;

type ListItem = {
  caption: string;
  mapTo: string;
  component: string;
};

type DataTableProps<T extends object> = {
  meta: {
    offset: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Array<T>;
  reader: ModelReader<T>;
  items: ListItem[];
};

function DataTable<T extends object>(props: DataTableProps<T>) {
  const history = useHistory();
  const match = useRouteMatch();

  const changePagination = useCallback(
    (offset, limit) => {
      history.push({
        search: qs.stringify(
          { page: { offset, limit } },
          { addQueryPrefix: true },
        ),
      });
    },
    [history],
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {props.items.map((item) => (
              <th key={item.caption}>{item.caption}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={`tr-${props.reader.getId(item)}`}>
              {props.items
                .filter((listItem) => componentMap[listItem.component])
                .map((listItem) => {
                  const Component = componentMap[listItem.component];

                  return (
                    <td key={listItem.caption}>
                      <Link to={`${match.url}/${props.reader.getId(item)}`}>
                        <Component>
                          {props.reader.getAttribute(item, listItem.mapTo)}
                        </Component>
                      </Link>
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total: {props.meta.total}</div>
      <ul>
        {Array(props.meta.totalPages)
          .fill(0)
          .map((_, index) => (
            <li
              key={`page-${index}`}
              onClick={() => changePagination(index + 1, props.meta.limit)}
            >
              {index + 1}
              {props.meta.offset === index + 1 && "*"}
            </li>
          ))}
      </ul>
    </div>
  );
}

export { DataTable };
