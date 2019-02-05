require('dotenv').config();
const express = require('express')
const cors = require('cors')

const accessToken = process.env.ACCESS_TOKEN;
const accountId = process.env.ACCOUNT_ID;

const basecamp = require('@jjperezaguinaga/basecamp').create({
  access_token: accessToken,
  account_id: accountId,
})

const app = express()
app.use(cors());
app.use(express.json());
app.set('port', (process.env.PORT || 8080));

app.get('/', async (req, res) => {
  const profile = await basecamp.my.profile.json.get({})
  res.send(profile);
})

app.get('/projects', async (req, res) => {
  const projects = await basecamp.projects.json.get({})
  res.send(projects);
})

app.post('/todolist', async (req, res) => {
  const projectId = req.body && req.body.projectId || 0;
  const todolistId = req.body && req.body.todolistId || 0;
  const completed = req.body && req.body.completed || false;
  const todolist = await basecamp.buckets.bucketId.todolists.todolistId.todos.json.get({
    "completed": completed,
    "bucketId": projectId,
    "todolistId": todolistId
  })
  res.send(todolist);
})

app.post('/question', async(req, res) => {
  const projectId = req.body && req.body.projectId || 0;
  const questionId = req.body && req.body.questionId || 0;
  const answers = await basecamp.buckets.bucketId.questions.questionId.answers.json.get({
    "bucketId": projectId,
    "questionId": questionId
  })
  res.send(answers);
})

app.post('/questionnaire', async (req, res) => {
  const projectId = req.body && req.body.projectId || 0;
  const questionnaireId = req.body && req.body.questionnaireId || 0;
  const questionnaire = await basecamp.buckets.bucketId.questionnaires.questionnaireId.questions.json.get({
    "bucketId": projectId,
    "questionnaireId": String(questionnaireId)
  })
  res.send(questionnaire);
})

app.post('/vault', async (req, res) => {
  const projectId = req.body && req.body.projectId || 0;
  const vaultId = req.body && req.body.vaultId || 0;
  const vault = await basecamp.buckets.bucketId.vaults.vaultId.documents.json.get({
    "bucketId": projectId,
    "vaultId": String(vaultId)
  })
  res.send(vault)
})

app.post('/todoset', async (req, res) => {
  const projectId = req.body && req.body.projectId || 0;
  const todosetId = req.body && req.body.todosetId || 0;
  const todoset = await basecamp.buckets.bucketId.todosets.todosetId.todolists.json.get({
    "bucketId": projectId,
    "todosetId": todosetId
  })
  res.send(todoset);
})

app.post('/project', async (req, res) => {
  const projectId = req.body && req.body.projectId || 0;
  const project = await basecamp.projects.projectId.json.get({
    "projectId": projectId
  })
  res.send(project);
})

app.get('/todos', async (req, res) => {
  /* Currently hardcoded for testing */
  const projectId = '10222521';
  const todosetId = '1482309512';
  const todos = await basecamp.buckets.bucketId.todosets.todosetId.todolists.json.get({
    "bucketId": projectId,
    "todosetId": todosetId
  })
  const todosNames = todos.map( todo => todo.name )
  res.send(todosNames);
})

app.listen(app.get('port'), () => {
  console.log('Running an authenticated Basecamp API endpoint', app.get('port'));
});

