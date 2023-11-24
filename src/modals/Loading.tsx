import { Box, CircularProgress, Grid, Modal } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/hooks";

function Loading() {
  return (
    <Modal open={true}>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="3rem" data-cy="loading-spinner" />
        </Grid>
      </Box>
    </Modal>
  );
}

export default Loading;
