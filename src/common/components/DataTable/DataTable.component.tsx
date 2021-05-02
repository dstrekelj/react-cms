import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { ModelReader } from "../../../cms/ModelReader";

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
              {props.items.map((listItem) => (
                <td key={listItem.caption}>
                  {props.reader.getAttribute(item, listItem.mapTo)}
                </td>
              ))}
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
