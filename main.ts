import express from "npm:express";
import tasksRouter from "./routes/tasks.routes.ts";
import swaggerUi from "npm:swagger-ui-express";
import swaggerJSDoc from "npm:swagger-jsdoc";

const app = express();
app.use(express.json());


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API for managing tasks",
    },
  },
  apis: ["./routes/*.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

// Routes
app.use("/tasks", tasksRouter);

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs running at http://localhost:${PORT}/docs`);
});