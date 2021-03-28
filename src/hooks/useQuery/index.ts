import { useLocation } from "react-router-dom";

function useQuery() {
  console.log(useLocation().search);
  return new URLSearchParams(useLocation().search);
}

export { useQuery };
