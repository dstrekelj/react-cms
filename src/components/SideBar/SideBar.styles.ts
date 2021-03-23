import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerDocked: {
    width: drawerWidth + "px",
  },
  drawerPaper: {
    width: drawerWidth + "px",
  },
  drawerContainer: {
    overflow: "auto",
  },
}));
