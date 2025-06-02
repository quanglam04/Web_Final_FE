import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddPhoto = ({ userLogin }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();

  const watchedFile = watch("image");

  // Tạo preview khi file thay đổi
  useEffect(() => {
    if (watchedFile && watchedFile[0]) {
      const file = watchedFile[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [watchedFile]);

  const onSubmit = async (data) => {
    // {tên ảnh, id của user, ngày tạo}
    if (!data.image[0]) {
      alert("Vui lòng tải File lên");
      return;
    }
    const file = data.image[0];

    // Tạo FormData
    const formData = new FormData();
    formData.append("image", file);
    formData.append("file_name", file.name);
    formData.append("date_time", new Date());
    formData.append("user_id", userLogin._id);
    formData.append("comments", JSON.stringify([]));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    setUploading(true);

    try {
      const response = await fetch("http://localhost:8081/api/photo/new", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 200) {
        const result = await response.json();
        alert(`Upload thành công. Tên file: ${result.file_name}`);

        // Lưu ảnh vào frontend
        const imageUrl = URL.createObjectURL(data.image[0]);
        console.log("Ảnh lưu tại:", imageUrl);

        reset();
        setPreview(null);
      } else if (response.status === 401) {
        const result = await response.json();
        alert(`${result.message}`);
      } else {
        const result = await response.json();
        alert(`${result.message}`);
      }
    } catch (error) {
      alert("Upload thất bại");
    }

    setUploading(false);
  };

  return (
    <div>
      <h2>Add Photo</h2>

      <div>
        <input type="file" accept=".jpg,.png,.jpeg" {...register("image")} />

        {preview && (
          <div style={{ margin: "20px 0" }}>
            <p>Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "300px",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
            <p>File: {watchedFile?.[0]?.name}</p>
          </div>
        )}

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={uploading}
          style={{
            padding: "10px 20px",
            backgroundColor: uploading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: uploading ? "not-allowed" : "pointer",
            marginTop: "10px",
          }}
        >
          {uploading ? "Đang upload..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddPhoto;
