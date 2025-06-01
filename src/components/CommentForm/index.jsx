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
      <input
        style={{
          width: "90%",
          height: "50px",
          marginRight: "10px",
        }}
        type="text"
        {...register("comment", { required: true })}
        placeholder="  Thêm bình luận"
      />
      {errors.comment && (
        <p style={{ color: "red", margin: "5px" }}>Yêu cầu nhập bình luận</p>
      )}
      <button type="submit" style={{ height: "50px" }}>
        Gửi
      </button>
    </form>
  );
}

export default CommentForm;
