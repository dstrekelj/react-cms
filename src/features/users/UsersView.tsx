import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { DataView } from "../../common/components/DataView";
import { User } from "./models/User";
import { JsonApiModelReader } from "../../cms/JsonApiModelReader";
import { ModelReader } from "../../cms/ModelReader";
import viewItems from "./config/viewItems.json";

const reader: ModelReader<User> = new JsonApiModelReader<User>();

export const UsersView = () => {
  const [state, setState] = useState<{ data: any } | null>(null);
  const params = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    fetch("https://api.mock/api/users/" + params.id)
      .then((response) => response.json())
      .then((json) => setState(json));
  }, [params.id]);

  return (
    <div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Back
        </button>
      </div>
      <div>
        <DataView<User> data={state?.data} reader={reader} items={viewItems} />
      </div>
    </div>
  );
};
