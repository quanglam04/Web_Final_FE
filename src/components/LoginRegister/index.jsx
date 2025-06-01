import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ setUser }) => {
  const [openFormLogin, setOpenFormLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:8081/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        alert("Login Success");
        setUser(result);
        console.log(result);
        navigate(`/api/user/${result._id}`);
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

            <form onSubmit={handleSubmit(onSubmit)}>
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
          </Paper>
        </Box>
      )}
    </>
  );
};
export default LoginRegister;
