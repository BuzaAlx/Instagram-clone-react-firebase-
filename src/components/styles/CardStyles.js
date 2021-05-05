import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #dbdbdb",
    borderRadius: "3px",
  },
  cardMedia: {
    paddingTop: "56%",
  },
  CardActions: {
    justifyContent: "space-between",
    height: theme.spacing(6),
    padding: 0,
  },

  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
