import express from "express";
import { taskRoutes } from "./routes/task";

const app = express();

const port = 3000;

app.use(express.json());
app.use(taskRoutes);
app.listen(port, () => console.log("listening on port", port));
