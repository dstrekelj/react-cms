import { PropsWithChildren } from "react";
import { Container, Toolbar } from "@material-ui/core";
import { SideBar, SideBarProps } from "../SideBar";
import { TopBar, TopBarProps } from "../TopBar";
import { useStyles } from "./Shell.styles";

type Props = {
  navigation: any[];
};

export type ShellProps = PropsWithChildren<Props> & TopBarProps & SideBarProps;

export function Shell(props: ShellProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <SideBar navigation={props.navigation} />
      <main className={classes.content}>
        <Toolbar />
        <Container>{props.children}</Container>
      </main>
    </div>
  );
}
