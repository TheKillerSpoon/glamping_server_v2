import express from "express";
import multer from "multer";
import {
  createreview,
  getreviews,
  getreviewById,
  updatereview,
  deletedreview,
} from "../handlers/review.handler.js";

const reviewRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reviews");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// get alle reviews
reviewRoute.get("/reviews", async (req, res) => {
  try {
    const result = await getreviews();

    return res.status(200).send({
      status: "ok",
      message: "reviews blev hentet!",
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
reviewRoute.post("/review", upload.single("image"), async (req, res) => {
  try {
    const { review, name, age } = req.body;
    // const image = req.file ? `uploads/products${req.file.filename}` : "";

    if (!review) {
      return res.status(400).send({
        status: "error",
        message: "reviewet skal have en titel!",
      });
    }
    const data = { review, name, age  };


    // req.file bliver automatisk tilføjet af multer
    if (req.file) {
      req.image =
        process.env.SERVER_HOST + "/reviews/" + req.file.filename;
    }

    const result = await createreview(data);

    return res.status(201).send({
      status: "Oprettet",
      message: "review oprettet!",
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
reviewRoute.get("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "review ID mangler!",
      });
    }

    const review = await getreviewById(id);
    return res.status(200).send({
      status: "ok",
      message: "review hentet",
      data: review,
    });
  } catch (error) {
    console.error("Fejl ved hentning af review:", error);
    return res.status(500).send({
      status: "error",
      message: "Intern serverfejl",
      error: error.message,
    });
  }
});

// Update
reviewRoute.put("/review", upload.single("image"), async (req, res) => {
  try {
    const { id, review, name, age } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        review: "review ID mangler!",
        data: [],
      });
    }

    // Tjekker, om en eller flere af variablerne er undefined eller tomme
    if (!review || !name || !age) {
      return res.status(400).send({
        status: "error",
        message: "review mangler review, name og/eller age",
        data: [],
      });
    }

    // Saml produktdata i et objekt
    const ReviewData = { id, review, name, age };

    // Send det videre som argument til handler
    const result = await updatereview(ReviewData);

    return res.status(200).send({
      status: "ok",
      message: "review opdateret!",
      data: result,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete
reviewRoute.delete("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "review ID mangler!",
      });
    }
    const result = await deletedreview(id);

    return res.status(200).send({
      status: "ok",
      message: "Review slettet!",
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

export default reviewRoute;