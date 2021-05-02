import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DataForm } from "../../common/components/DataForm";
import { User } from "./models/User";
import { JsonApiModelReader } from "../../cms/JsonApiModelReader";
import { ModelReader } from "../../cms/ModelReader";
import formItems from "./config/formItems.json";

const reader: ModelReader<User> = new JsonApiModelReader<User>();

export const UsersForm = () => {
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
        {state && (
          <DataForm<User>
            data={state?.data}
            reader={reader}
            items={formItems}
          />
        )}
      </div>
    </div>
  );
};
