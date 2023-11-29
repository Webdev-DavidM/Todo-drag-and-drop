import { ReactNode } from 'react';

// mui
import { styled } from '@mui/system';

// snackbar
import { SnackbarProvider } from 'notistack';

interface IPropsSnackBar {
  children: ReactNode;
}

const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  '&.SnackbarItem-variantSuccess': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.SnackbarItem-variantError': {
    backgroundColor: theme.palette.secondary.main,
  },
  '& #notistack-snackbar': {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif;',
    color: 'primary.text',
  },
}));

export const SnackBar = (props: IPropsSnackBar) => {
  return (
    <StyledSnackbarProvider
      maxSnack={3}
      autoHideDuration={20000000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
      {props.children}
    </StyledSnackbarProvider>
  );
};
