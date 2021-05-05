import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  commentBox: {
    display: "flex",
    height: theme.spacing(5),
    gap: "10px",
    padding: "0 16px 16px",
  },
  commentInput: {
    flexGrow: "1",
  },
  deleteIcon: {
    position: "absolute",
    right: 0,
  },
  username: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.light,
  },
  inputBox: {
    position: "relative",
    display: "flex",
    height: theme.spacing(5),
    gap: "10px",
    width: "100%",
  },
  smileButton: {
    position: "absolute",
    right: 0,
  },
  text: {
    fontSize: "13px",
    margin: 0,
  },
}));
