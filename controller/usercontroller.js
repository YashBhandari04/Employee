
import User from "../model/usermodel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const user = await User.create(
      { name, email, department }
    );
    res.status(201).json(
      {
        message: "User created successfully",
        success: true,
        user,
      },
    );

  } catch (error) {
    res.status(500).json(
      { message: "Error creating user", error },
    );
  }
};

export const getUsers = async (req, res) => {

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(
    { message: "Error fetching users", error,
    success:false
    }
);
  }
};