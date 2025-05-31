import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { fetchListUserModel } from "../../lib/fetchModelData";

function UserList() {
  // call API lấy danh sách tất cả các người dùng rồi gán vào model
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchListUser = async () => {
      const result = await fetchListUserModel(
        "https://2x5yr7-8081.csb.app/api/user/list"
      );
      if (result) {
        setUsers(result);
        console.log("Kết quả trả về: ", result);
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
