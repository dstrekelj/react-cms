import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));
