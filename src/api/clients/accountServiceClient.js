const axios = require("axios");

exports.getUser = async function (userId) {
  try {
    const res = await axios.get("http://localhost:8080/user/" + userId);
    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.getUserProfile = async function (userId) {
  try {
    const res = await axios.get("http://localhost:8080/profile/user/" + userId);
    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.getUsersById = async function (userId) {
  try {
    const res = await axios.get(
      "http://localhost:8080/user/" + userId + "/users"
    );
    return res.data.map(function (user) {
      return {
        id: user.id,
        name: user.name,
        userName: user.login.userName,
        profile: user.login.profile.description,
      };
    });
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.getUserLoginByUserName = async function (userName) {
  try {
    const res = await axios.get(
      "http://localhost:8080/login/user?userName=" + userName
    );

    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.createUserChild = async function (userId, user) {
  try {
    const userToClient = {
      name: user.name,
      company: {
        id: user.companyId,
      },
      login: {
        password: user.password,
        userName: user.userName,
        profile: {
          id: user.profileId,
        },
      },
    };

    const res = await axios.post(
      "http://localhost:8080/user/" + userId,
      userToClient
    );

    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.createUser = async function (user) {
  try {
    const userToClient = {
      name: user.name,
      company: {
        name: user.companyName,
      },
      login: {
        password: user.password,
        userName: user.userName,
      },
    };

    const res = await axios.post("http://localhost:8080/user", userToClient);

    return res.data;
  } catch (error) {
    if (error.response.data.error === "conflict_error") {
      throw new Error("conflict_error");
    }

    throw new Error(error);
  }
};

// exports.changeUser = (user, userId) => {
//   //TODO PUT
//   let resp = {
//     userId: userId,
//     email: "teste@teste.com.br",
//     profile: "OWNER",
//   };

//   return resp;
// };

exports.getProfile = async (profileId) => {
  try {
    const res = await axios.get("http://localhost:8080/profile/" + profileId);

    return res.data;
  } catch (error) {
    if (error.response.data.error === "resource_not_found_error") {
      throw new Error("resource_not_found_error");
    }

    throw new Error(error);
  }
};

exports.getProfiles = async () => {
  try {
    const res = await axios.get("http://localhost:8080/profile");

    return res.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.error === "resource_not_found_error") {
      throw new Error("resource_not_found_error");
    }

    throw new Error(error);
  }
};

exports.changeUser = async (userId, bodyToChange) => {
  try {
    const res = await axios.put(
      "http://localhost:8080/user/" + userId,
      bodyToChange
    );

    return res.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.error === "resource_not_found_error") {
      throw new Error("resource_not_found_error");
    }

    throw new Error(error);
  }
};

exports.getUserLoginByUserId = async function (userId) {
  try {
    const res = await axios.get("http://localhost:8080/login/user/" + userId);

    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};
