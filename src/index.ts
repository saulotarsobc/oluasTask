import express from 'express';
// import bodyParser from "body-parser";
import users from "./routes/users";
import tasks from "./routes/tasks";


const app = express();
app.use('/users', users);
app.use('/tasks', tasks);

app.listen(3000, () => { console.log('server running') });
