import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataTable } from "../../common/components/DataTable";
import { Post } from "./models/Post";
import { JsonApiModelReader } from "../../cms/JsonApiModelReader";
import { ModelReader } from "../../cms/ModelReader";
import listItems from "./config/listItems.json";

const reader: ModelReader<Post> = new JsonApiModelReader<Post>();

export const PostsFeature = () => {
  const [state, setState] = useState({
    data: [],
    meta: { offset: 1, limit: 10, total: 100, totalPages: 10 },
  });
  const location = useLocation();

  useEffect(() => {
    fetch("https://api.mock/api/posts" + location.search)
      .then((response) => response.json())
      .then((json) => setState(json));
  }, [location.search]);

  return (
    <div>
      <DataTable<Post>
        data={state.data}
        meta={state.meta}
        reader={reader}
        items={listItems}
      />
    </div>
  );
};
