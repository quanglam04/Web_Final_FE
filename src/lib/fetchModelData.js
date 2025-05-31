/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const fetchListUserModel = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
};

const fetchUserByIDModel = async (url) => {
  console.log("Call API fetchUser");
  try {
    const response = await fetch(url, {
      method: "get",
      headers: {
        Accept: "application /json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("Error creating data:", error);
    return null;
  }
};

const fetchPhotoByUserIDModel = async (url) => {
  try {
    const response = await fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
  }
};
export { fetchListUserModel, fetchUserByIDModel, fetchPhotoByUserIDModel };
