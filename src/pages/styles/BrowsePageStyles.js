import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: 5,
    paddingTop: 5,
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
    position: "sticky ",
    top: 0,
    background: "white",
    zIndex: "1",
    height: "55px",
  },
  box: {
    justifyContent: "flex-end",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    gap: 10,
  },
  userName: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
