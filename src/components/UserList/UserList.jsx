import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchListUser = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/user/list", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const result = await response.json();
          setUsers(result);
        } else if (response.status === 401) {
          alert("Vui lòng đăng nhập");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
      }
    };

    fetchListUser();
  }, []);

  return (
    <div className="list-container">
      <List>
        {users.map((user, index) => (
          <div key={user._id}>
            <ListItem
              button
              component={Link}
              to={`/api/user/${user._id}`}
              className="list-item"
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                className="list-item-text"
              />
            </ListItem>
            {index < users.length - 1 && <Divider className="divider" />}
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
