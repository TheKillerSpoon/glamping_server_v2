import express from "express";
import cors from "cors";
import productRoute from "./routes/stay.routes.js"
import AcivtyRoute from "./routes/activity.routes.js";
import reviewRoute from "./routes/review.routes.js";

const expressServer = express();

expressServer.use(cors());

expressServer.use(express.static("uploads"));

expressServer.use(express.json());

expressServer.use(productRoute, AcivtyRoute, reviewRoute) ;

expressServer.listen(3043, () => {
  console.log("Serveren kører på http://localhost:3043");
});
 