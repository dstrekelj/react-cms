import { useRouter } from "next/router";

export default function Show() {
  const router = useRouter();
  console.log(router);
  return <div>Show</div>;
}
