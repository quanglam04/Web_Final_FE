import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorLogin, setErrorLogin] = useState("");
  const onSubmit = async (data) => {};
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f9f9f9"
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: 350,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            Đăng ký tài khoản
          </Typography>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              variant="outlined"
              margin="normal"
              {...register("login_name", { required: true })}
              error={!!errors.login_name}
              helperText={errors.login_name && "Tên đăng nhập là bắt buộc"}
            />
            {errorLogin && (
              <>
                <div style={{ color: "red" }}>
                  Tên đăng nhập không chính xác
                </div>
              </>
            )}

            <TextField
              fullWidth
              label="Tên đăng nhập"
              variant="outlined"
              margin="normal"
              {...register("login_name", { required: true })}
              error={!!errors.login_name}
              helperText={errors.login_name && "Tên đăng nhập là bắt buộc"}
            />
            {errorLogin && (
              <>
                <div style={{ color: "red" }}>
                  Tên đăng nhập không chính xác
                </div>
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Đăng nhập
            </Button>
          </form>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>
              Đã có tài khoản?{" "}
              <Link style={{ textDecoration: "none" }} to="/">
                Nhấn vào đây
              </Link>{" "}
              để đăng nhập
            </span>
          </div>
        </Paper>
      </Box>
    </>
  );
};
export default Register;
