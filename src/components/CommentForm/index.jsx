import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

function CommentForm({ fetchPhotoByUserID, photoId, userLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const comment = {
      ...data,
      id_photo: photoId,
      date_time: new Date().toLocaleString(),
      userLogin: userLogin,
    };
    const response = await fetch(
      "http://localhost:8081/api/photo/commentsOfPhoto/" + photoId,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
    if (response.status === 200) {
      alert("Bình luận thành công");
      const result = await response.json();
      console.log(result);
      fetchPhotoByUserID();
      reset();
    } else if (response.status === 401) {
      alert("Vui lòng đăng nhập");
    }
    // call API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" alignItems="center" gap={2} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Thêm bình luận"
          {...register("comment", { required: true })}
          size="medium"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ height: "56px" }}
        >
          Gửi
        </Button>
      </Box>
    </form>
  );
}

export default CommentForm;
