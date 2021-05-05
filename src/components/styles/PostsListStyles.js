import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    gap: "5px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  photo: {
    width: "33%",
  },
}));
