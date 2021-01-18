import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  username: {
    marginRight: theme.spacing(2),
  },
  header: {
    paddingBottom: 5,
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
  },
  box: {
    justifyContent: "flex-end",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    gap: 10,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  main: {
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(5),
    borderBottom: `1px solid ${theme.palette.divider}`,
    gap: "20px",
  },
  activity: {
    gap: theme.spacing(1),
  },
}));
