import express from 'express';
import routerUsers from "./routes/users";
import routerTasks from "./routes/tasks";

const app = express();

app.use('/users', routerUsers);
app.use('/tasks', routerTasks);

app.listen(4000, () => { console.log('server running') });
