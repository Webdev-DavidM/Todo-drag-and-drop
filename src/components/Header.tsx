import { Grid, Typography } from "@mui/material";

// type Props = {};

export default function Header() {
  return (
    <Grid
      container
      sx={{
        // minHeight: "10vh",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "white",
        right: "0",
        maxWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        overflowY: "hidden" /* Hide vertical scrollbar */,
        overflowX: "hidden" /* Hide horizontal scrollbar */,

        // p: 3,
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 3,
        }}
      >
        Todo list
      </Typography>

      <Typography
        variant="h5"
        color="primary"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 1,
        }}
      >
        Please drag and drop your todos in the relevant columns
      </Typography>
    </Grid>
  );
}
