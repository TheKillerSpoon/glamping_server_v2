import express from "express";
import multer from "multer";
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deletedActivity,
} from "../handlers/activity.handler.js";

const ActivityRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/activities");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// get alle activities
ActivityRoute.get("/activities", async (req, res) => {
  try {
    const result = await getActivities();

    return res.status(200).send({
      status: "ok",
      message: "activity blev hentet!",
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
ActivityRoute.post(
  "/activity",
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, weekday, time } = req.body;

      if (!title) {
        return res.status(400).send({
          status: "error",
          message: "activity skal have en titel!",
        });
      }
      const activity = { title, description, weekday, time };

      // req.file bliver automatisk tilføjet af multer
      if (req.file) {
        req.image = process.env.SERVER_HOST + "/activities/" + req.file.filename;
      }

      const result = await createActivity(activity);

      return res.status(201).send({
        status: "Oprettet",
        message: "activity oprettet!",
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
  }
);

// Get by id
ActivityRoute.get("/activity/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "activity ID mangler!",
      });
    }

    const activity = await getActivityById(id);
    return res.status(200).send({
      status: "ok",
      message: "activity hentet",
      data: activity,
    });
  } catch (error) {
    console.error("Fejl ved hentning af activity:", error);
    return res.status(500).send({
      status: "error",
      message: "Intern serverfejl",
      error: error.message,
    });
  }
});

// Update
ActivityRoute.put(
  "/activity",
  upload.single("image"),
  async (req, res) => {
    try {
      const { id, title, description, weekday, time } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          activity: "Activity ID mangler!",
          data: [],
        });
      }

      // Tjekker, om en eller flere af variablerne er undefined eller tomme
      if (!title || !description || !weekday || !time) {
        return res.status(400).send({
          status: "error",
          message: "Activity mangler title, description, weekday og/eller time",
          data: [],
        });
      }

      // Saml produktdata i et objekt
      const activityData = { id, title, description, weekday, time };

      // Send det videre som argument til handler
      const result = await updateActivity(activityData);

      return res.status(200).send({
        status: "ok",
        message: "Activity opdateret!",
        data: result,
      });
    } catch (error) {
      console.error("Error updating activity:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// Delete
ActivityRoute.delete("/activity/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Activity ID mangler!",
      });
    }
    const result = await deletedActivity(id);

    return res.status(200).send({
      status: "ok",
      message: "Activity slettet!",
      data: result.title,
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

export default ActivityRoute;