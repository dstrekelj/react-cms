import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataTable } from "../../common/components/DataTable";
import { User } from "./models/User";
import { JsonApiModelReader } from "../../cms/JsonApiModelReader";
import { ModelReader } from "../../cms/ModelReader";

const reader: ModelReader<User> = new JsonApiModelReader<User>();

export const UsersFeature = () => {
  const [state, setState] = useState({
    data: [],
    meta: { offset: 1, limit: 10, total: 100, totalPages: 10 },
  });
  const location = useLocation();

  useEffect(() => {
    fetch("https://api.mock/api/users" + location.search)
      .then((response) => response.json())
      .then((json) => setState(json));
  }, [location.search]);

  return (
    <div>
      <DataTable<User>
        data={state.data}
        meta={state.meta}
        headers={["id", "username", "email"]}
        reader={reader}
      />
    </div>
  );
};
