import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import * as icons from "@material-ui/icons";
import React, { PropsWithChildren } from "react";
import { useStyles } from "./SideBar.styles";
import { Link } from "../Link";

type Props = {
  navigation: any[];
};

export type SideBarProps = PropsWithChildren<Props>;

export function SideBar(props: SideBarProps) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        root: classes.drawer,
        docked: classes.drawerDocked,
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {props.navigation &&
            props.navigation.map((item) => (
              <ListItem key={item.id} button component={Link} href={item.path}>
                <ListItemIcon>
                  {(() => {
                    const Component = icons[item.icon];
                    console.log(Component);
                    return Component && <Component />;
                  })()}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
        </List>
      </div>
    </Drawer>
  );
}
