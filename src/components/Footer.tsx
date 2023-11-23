import { Button, Grid } from "@mui/material";

// Store
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

type Props = {};

const BottomNavBar = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Grid
      container
      sx={{
        height: "10vh",
        width: "100%",
        padding: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        backgroundColor: "white",
        right: "0",
        borderTop: "1px solid #e0e0e0",
      }}
      gap={1}
    ></Grid>
  );
};

export default BottomNavBar;
