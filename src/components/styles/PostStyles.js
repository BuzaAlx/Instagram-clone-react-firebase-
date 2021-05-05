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
    width: "auto",
    height: "auto",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    height: "auto",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    maxWidth: "60%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80%",
      width: "80%",
    },
  },
  icon: {
    color: "#f06292",
  },
  ImgModal: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modalIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    [theme.breakpoints.up("sm")]: {
      visibility: "hidden",
    },
  },
  ListBar: {
    background: "none",
    [theme.breakpoints.down("sm")]: {
      visibility: "hidden",
    },
  },
  photo: {
    width: "32%",

    height: "30vw",
    [theme.breakpoints.up("md")]: {
      height: "300px",
    },
  },
}));
