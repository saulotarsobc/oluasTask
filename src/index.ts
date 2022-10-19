import express from 'express';
import users from "./routes/users";
import tasks from "./routes/tasks";

const app = express();

app.use('/users', users);
app.use('/tasks', tasks);

app.listen(3000, (event: any) => {
    console.log('server running', event)
});
