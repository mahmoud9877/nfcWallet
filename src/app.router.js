import cors from "cors";
import connectDB from "../DB/connection.js";
import auth from "../src/module/auth/auth.router.js";
import profileUser from "./module/profile/profile.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
const initApp = (app, express) => {
  const corsOptions = {
    origin: "*", // السماح لجميع النطاقات بالوصول
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.get("/", (req, res) => res.json({ message: "home" }));

  app.use("/profile", profileUser);
  app.use("/auth", auth);
  app.use(globalErrorHandling);
  connectDB();
};

export default initApp;
