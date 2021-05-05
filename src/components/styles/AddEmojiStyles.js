import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  smileButton: {
    position: "absolute",
    right: 0,
  },
  emojiContainer: {
    fontSize: "20px",
    display: "flex",
  },
  emoji: {
    display: "block",
    padding: 10,
    cursor: "pointer",
  },
}));
