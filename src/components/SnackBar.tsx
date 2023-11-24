import { ReactNode } from "react";

// mui
import { styled } from "@mui/system";

// snackbar
import { SnackbarProvider } from "notistack";

interface IPropsSnackBar {
  children: ReactNode;
}

const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  "&.SnackbarItem-variantSuccess": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.SnackbarItem-variantError": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const SnackBar = (props: IPropsSnackBar) => {
  return (
    <StyledSnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      {props.children}
    </StyledSnackbarProvider>
  );
};
