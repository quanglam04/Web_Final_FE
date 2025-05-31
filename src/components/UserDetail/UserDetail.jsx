import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { fetchUserByIDModel } from "../../lib/fetchModelData";

function UserDetail() {
  const navigate = useNavigate();
  const userParams = useParams();
  const id = userParams.userId;
  const [userDetailDisplay, setUserDetailDisplay] = useState();
  useEffect(() => {
    const fetchUserByID = async () => {
      const result = await fetchUserByIDModel(
        "https://2x5yr7-8081.csb.app/api/user/" + id
      );
      setUserDetailDisplay(result);
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
