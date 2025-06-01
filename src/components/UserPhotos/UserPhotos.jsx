import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

function UserPhotos() {
  const navigate = useNavigate();
  const userParams = useParams();
  const userId = userParams.userId;
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotoByUserID = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/user/photosOfUser/" + userId,
          {
            method: "get",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setUserPhotos(result);
        }
      } catch (error) {
        console.error("Lỗi khi lấy data:", error);
      }
    };

    fetchPhotoByUserID();
  }, [userPhotos]);

  return (
    <div>
      {userPhotos.length === 0 ? (
        <Typography className="no-comments">
          Không có ảnh nào để hiển thị
        </Typography>
      ) : (
        userPhotos.map((photo) => (
          <Card key={photo._id} className="card">
            <CardMedia
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                objectFit: "contain",
                margin: "0 auto",
              }}
              component="img"
              image={`/images/${photo.file_name}`}
              className="MuiCardMedia-root"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "10px" }}
              >
                Tạo lúc: {new Date(photo.date_time).toLocaleString()}
              </Typography>

              {photo.comments && photo.comments.length > 0 ? (
                <>
                  <Divider className="MuiDivider-root" />
                  <Typography variant="h6">Bình luận</Typography>

                  {photo.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <Typography variant="subtitle2" color="textSecondary">
                        {new Date(comment.date_time).toLocaleString()}
                      </Typography>

                      <Typography
                        onClick={() => {
                          navigate(`/api/user/${comment.user._id}`);
                        }}
                        variant="subtitle1"
                        className="MuiTypography-subtitle1"
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Typography>

                      <Typography variant="body1">{comment.comment}</Typography>
                    </div>
                  ))}
                </>
              ) : (
                <Typography className="no-comments">
                  Không có bình luận nào.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default UserPhotos;
