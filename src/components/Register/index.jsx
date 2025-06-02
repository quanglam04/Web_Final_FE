import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState("");
  const onSubmit = async (data) => {
    if (data.pass_word !== data.confirm_pass_word) {
      setErrorLogin("Mật khẩu nhập không chính xác");
      return;
    } else {
      setErrorLogin("");
      try {
        const response = await fetch(
          "http://localhost:8081/api/admin/register",
          {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          alert(`${result.message}`);
          navigate("/");
        } else if (response.status === 400) {
          const result = await response.json();
          alert(`${result.message}`);
          reset();
        } else {
          const result = await response.json();
          alert(`${result.message}`);
        }
      } catch (e) {
        //
      }
    }
  };
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
              {...register("login_name", {
                required: "Tên đăng nhập là bắt buộc",
                validate: (value) =>
                  value.trim() !== "" || "Tên đăng nhập không được để trống",
              })}
              error={!!errors.login_name}
              helperText={errors.login_name?.message}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              variant="outlined"
              margin="normal"
              {...register("pass_word", {
                required: "Mật khẩu là bắt buộc",
                validate: (value) =>
                  value.trim() !== "" || "Mật khẩu không được để trống",
              })}
              error={!!errors.pass_word}
              helperText={errors.pass_word?.message}
            />

            <TextField
              fullWidth
              type="password"
              label="Nhập lại mật khẩu"
              variant="outlined"
              margin="normal"
              {...register("confirm_pass_word", { required: true })}
              error={!!errors.confirm_pass_word}
              helperText={
                errors.confirm_pass_word && "Nhập lại mật khẩu là bắt buộc"
              }
            />
            {errorLogin && <div style={{ color: "red" }}>{errorLogin}</div>}

            <TextField
              fullWidth
              label="Họ"
              variant="outlined"
              margin="normal"
              {...register("first_name", {
                required: "Họ tên là bắt buộc",
                validate: (value) =>
                  value.trim() !== "" || "Họ không được để trống",
              })}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />

            <TextField
              fullWidth
              label="Tên"
              variant="outlined"
              margin="normal"
              {...register("last_name", {
                required: "Tên là bắt buộc",
                validate: (value) =>
                  value.trim() !== "" || "Tên không được để trống",
              })}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />

            <TextField
              fullWidth
              label="Địa chỉ"
              variant="outlined"
              margin="normal"
              {...register("location")}
            />

            <TextField
              fullWidth
              label="Giới thiệu bản thân"
              variant="outlined"
              margin="normal"
              {...register("description")}
            />

            <TextField
              fullWidth
              label="Nghề nghiệp"
              variant="outlined"
              margin="normal"
              {...register("occupation")}
            />

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
