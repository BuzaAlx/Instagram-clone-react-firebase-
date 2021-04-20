import React from "react";
import Spinner from "../../resources/images/spinner.gif";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

const FullPageLoader = ({ text }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{
        height: "100vh",
      }}
    >
      {text && (
        <div>
          <Typography
            color="textPrimary"
            variant="h2"
            style={{ textTransform: "uppercase" }}
          >
            {text}
          </Typography>
        </div>
      )}
      {/* <img src={Spinner} className="loader" alt="loading" /> */}
      <CircularProgress size={50} />
    </Box>
  );
};

export default FullPageLoader;
