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
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:8081/api/admin/login", {
        method: "POST",
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
        navigate(`api/user/${result._id}`);
        setOpenFormLogin(false);
      } else if (response.status === 404) {
        const result = await response.json();
        console.log(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return null;
    }
  };
  return (
    <>
      {openFormLogin && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <label style={{ paddingRight: "10px" }}>Login_name</label>
            <input
              type="text"
              {...register("login_name", { required: true })}
            />
            <br />
            {errors.slug && (
              <div style={{ color: "red" }}>Login_name is required</div>
            )}

            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default LoginRegister;
