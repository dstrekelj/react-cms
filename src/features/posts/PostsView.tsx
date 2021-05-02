import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DataView } from "../../common/components/DataView";
import { Post } from "./models/Post";
import { JsonApiModelReader } from "../../cms/JsonApiModelReader";
import { ModelReader } from "../../cms/ModelReader";
import viewItems from "./config/viewItems.json";

const reader: ModelReader<Post> = new JsonApiModelReader<Post>();

export const PostsView = () => {
  const [state, setState] = useState<{ data: any } | null>(null);
  const params = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    fetch("https://api.mock/api/posts/" + params.id)
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
        <DataView<Post> data={state?.data} reader={reader} items={viewItems} />
      </div>
    </div>
  );
};
