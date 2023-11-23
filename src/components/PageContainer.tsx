import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function PageContainer({ children }: Props) {
  const theme = useTheme();
  const smallerThanDesktop = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid
      container
      xs={12}
      sx={{
        minHeight: smallerThanDesktop ? "110vh" : "100vh",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {children}
    </Grid>
  );
}

export default PageContainer;
