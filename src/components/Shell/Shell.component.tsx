import { PropsWithChildren } from "react";
import { SideBar, SideBarProps } from "../SideBar";
import { TopBar, TopBarProps } from "../TopBar";

type Props = {
  navigation: any[];
};

export type ShellProps = PropsWithChildren<Props> & TopBarProps & SideBarProps;

export function Shell(props: ShellProps) {
  return (
    <div>
      <header>
        <TopBar />
      </header>
      <main>
        <SideBar navigation={props.navigation} />
        <div>{props.children}</div>
      </main>
    </div>
  );
}
