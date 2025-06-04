import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
const BASE_API = process.env.REACT_APP_API_URL;
function UserDetail() {
  const navigate = useNavigate();
  const userParams = useParams();
  const id = userParams.userId;
  const [userDetailDisplay, setUserDetailDisplay] = useState();
  useEffect(() => {
    const fetchUserByID = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }
      try {
        const response = await fetch(`${BASE_API}/api/user/` + id, {
          method: "get",
          headers: {
            Accept: "application /json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const result = await response.json();
          setUserDetailDisplay(result);
        } else {
          const result = await response.json();
          alert(`${result.message}`);
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error creating data:", error);
      }
    };
    fetchUserByID();
  }, [id]);

  return (
    <>
      {userDetailDisplay ? (
        <Card className="card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Họ tên: {userDetailDisplay.first_name}{" "}
              {userDetailDisplay.last_name}
            </Typography>

            <Typography variant="body1">
              Địa chỉ: {userDetailDisplay.location}
            </Typography>

            <Typography variant="body1">
              Nghề nghiệp: {userDetailDisplay.occupation}
            </Typography>

            <Typography variant="body1">
              Miêu tả: {userDetailDisplay.description}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() =>
                navigate(`/api/user/photosOfUser/${userParams.userId}`)
              }
            >
              Ảnh của tôi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div style={{ color: "red" }}>Đang tải dữ liệu người dùng</div>
      )}
    </>
  );
}

export default UserDetail;
