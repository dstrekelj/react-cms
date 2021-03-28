import React, { PropsWithChildren } from "react";
import { Link } from "../Link";

type Props = {
  navigation: any[];
};

export type SideBarProps = PropsWithChildren<Props>;

export function SideBar(props: SideBarProps) {
  return (
    <nav>
      <ul>
        {props.navigation &&
          props.navigation.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
