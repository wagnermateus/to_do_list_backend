import express from "express";
import { taskRoutes } from "./routes/task";
const cors = require("cors");
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(taskRoutes);
app.listen(port, () => console.log("listening on port", port));
