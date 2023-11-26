import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {};

function Login({}: Props) {
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "primary.light",
        }}
      >
        <Card
          sx={{
            width: "40%",
            maxWidth: 600,
            p: 1,
            margin: "auto",
          }}
        >
          <CardContent>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item xs={12} mb={2}>
                <Typography variant="h4" align="center">
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  size="medium"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </form>
  );
}

export default Login;
