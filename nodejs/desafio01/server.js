const express = require("express");
const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Projeto 1",
    tasks: ["Nova Tarefa 1", "Nova Tarefa 2"]
  }
];

server.get("/projects", (request, response) => {
  return response.json(projects);
});

server.post("/projects", (request, response) => {
  const { id, title } = request.body;

  const project = {
    id,
    title
  };

  projects.push(project);

  return response.status(201).json(projects);
});

server.post("/projects/:id/tasks", (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  let project = projects.filter(project => project.id === id);

  project[0].tasks.push(title);

  projects.map(project => project.id === id).push(project);

  return response.status(201).json(projects);
});

server.listen(3333);
