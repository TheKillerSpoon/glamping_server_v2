import express from "express";
import multer from "multer";
import {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
  deleteUser,
} from "../handlers/user.handler.js";

const UserRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  }, 
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// get alle products
UserRoute.get("/users", async (req, res) => {
  try {
    const result = await getUsers();

    return res.status(200).send({
      status: "ok",
      message: "Users blev hentet!",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl", error);
    return res.status(500).send({
      status: "error",
      message: "Server-fejl",
      error: error.message,
    });
  }
});

// Create
UserRoute.post("/user", upload.single("image"), async (req, res) => {
  try {
    const { name, email, hashedPassword, role } = req.body;

    if (!name) {
      return res.status(400).send({
        status: "error",
        message: "User skal have en titel!",
      });
    }
    const user = { name, email, hashedPassword, role };

    // req.file bliver automatisk tilføjet af multer
    if (req.file) {
      user.image =
        process.env.SERVER_HOST + "/users/" + req.file.filename;
    }

    const result = await createUser(user);

    return res.status(201).send({
      status: "Oprettet",
      message: "Product oprettet!",
      data: result,
    });
  } catch (error) {
    console.error("Der skete en fejl:", error);

    return res.status(500).send({
      status: "error",
      message: "Der skete en fejl:",
      error: error.message,
    });
  }
});

// Get by id
UserRoute.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "user ID mangler!",
      });
    }

    const product = await getUsersById(id);
    return res.status(200).send({
      status: "ok",
      message: "User hentet",
      data: product,
    });
  } catch (error) {
    console.error("Fejl ved hentning af user:", error);
    return res.status(500).send({
      status: "error",
      message: "Intern serverfejl",
      error: error.message,
    });
  }
});

// Update
UserRoute.put("/user", upload.single("image"), async (req, res) => {
  try {
    const { id, name, email, hashedPassword, role } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        product: "User ID mangler!",
        data: [],
      });
    }

    // Tjekker, om en eller flere af variablerne er undefined eller tomme
    if (!name || !email || !hashedPassword || !role) {
      return res.status(400).send({
        status: "error",
        message: "user mangler title, description, price og/eller category",
        data: [],
      });
    }

    // Saml produktdata i et objekt
    const UserData = { id, name, email, hashedPassword, role };

    // Send det videre som argument til handler
    const result = await updateUser(UserData);

    return res.status(200).send({
      status: "ok",
      message: "User opdateret!",
      data: result,
    });
  } catch (error) {
    console.error("Error updating User:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete
UserRoute.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID mangler!",
      });
    }
    const result = await deleteUser(id);

    return res.status(200).send({
      status: "ok",
      message: "user slettet!",
      data: result.name,
    });
  } catch (error) {
    console.error("Der skete en fejl:", error);

    return res.status(500).send({
      status: "error",
      message: "Der skete en fejl:",
      data: result,
      error: error.message,
    });
  }
});

export default UserRoute;