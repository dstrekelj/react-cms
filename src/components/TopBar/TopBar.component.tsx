import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import { useStyles } from "./TopBar.styles";

type Props = {};

export type TopBarProps = PropsWithChildren<Props>;

export function TopBar(props: TopBarProps) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Dashboard
        </Typography>
        <Box flexGrow={1} />
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
