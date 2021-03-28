import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

type DataTableProps<T> = {
  meta: {
    offset: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Array<T>;
};

function DataTable<T>(props: DataTableProps<T>) {
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
        <tbody>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
          {props.data.map((item, index) => (
            <tr key={`tr-${index}`}>
              {/* @ts-ignore */}
              <td>{item?.id}</td>
              {/* @ts-ignore */}
              <td>{item?.attributes?.username}</td>
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
