import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const BASE_API = process.env.REACT_APP_API_URL;
const Login = ({ setUser }) => {
  const [openFormLogin, setOpenFormLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = await fetch(`${BASE_API}/api/admin/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result.token) {
          // Lưu token vào localStorage hoặc sessionStorage
          localStorage.setItem("token", result.token);
        }
        alert("Login Success");
        setUser(result.user);
        navigate(`/api/user/${result.user._id}`);
        setOpenFormLogin(false);
      } else if (response.status === 401) {
        const result = await response.json();
        setErrorLogin(result);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return null;
    }
  };
  return (
    <>
      {openFormLogin && (
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
              Đăng nhập
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

              <TextField
                fullWidth
                type="password"
                label="Mật khẩu"
                variant="outlined"
                margin="normal"
                {...register("pass_word", { required: true })}
                error={!!errors.pass_word}
                helperText={errors.pass_word && "Mật khẩu là bắt buộc"}
              />
              {errorLogin && (
                <>
                  <div style={{ color: "red" }}>
                    Mật khẩu hoặc tên đăng nhập không chính xác
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
                Chưa có tài khoản?{" "}
                <Link style={{ textDecoration: "none" }} to="/register">
                  Nhấn vào đây
                </Link>{" "}
                để đăng ký
              </span>
            </div>
          </Paper>
        </Box>
      )}
    </>
  );
};
export default Login;
