const express = require("express");
const server = express();

server.use(express.json());

function checkExistProject(request, response, next) {
  const { id } = request.params;
  let project = projects.filter(project => project.id === id);

  if ( !project[0] ) {
    return response.status(404).json({ error: "Project not found"});
  }

  request.project = project;
  return next(); 
}

let requests = 0;

function countRequests(request, response, next) {
  console.log(`Requisições realizadas: ${++requests}`);

  return next();
}

const projects = [
  {
    id: "1",
    title: "Projeto 1",
    tasks: ["Nova Tarefa 1", "Nova Tarefa 2"]
  }
];

server.get("/projects", countRequests, (request, response) => {
  return response.json(projects);
});

server.post("/projects", countRequests, (request, response) => {
  const { id, title } = request.body;

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return response.status(201).json(projects);
});

server.put("/projects/:id", checkExistProject, countRequests, (request, response) => {
  const { title } = request.body;
  let project = request.project;

  project[0].title = title;

  projects.map(proj => proj.id === project.id).push(project);

  return response.json(project);
});

server.delete("/projects/:id", checkExistProject, countRequests, (request, response) => {
  const { id } = request.project[0];

  projects.map((project, index )=> {
    if (project.id = id) {
      return projects.splice(index, 1);
    }
  });

  return response.send();
});

server.post("/projects/:id/tasks", checkExistProject, countRequests, (request, response) => {
  const { title } = request.body;

  let project = request.project;

  project[0].tasks.push(title);

  projects.map(proj => proj.id === project.id).push(project);

  return response.status(201).json(projects);
});

server.listen(3333);
