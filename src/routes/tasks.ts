import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { tasks } from './fb';

const router = express.Router();
router.use(bodyParser.json());

router.post("/add", async (req: Request, res: Response) => {
    const { task_id } = req.body;

    if (!task_id) {
        res.json({
            success: false,
            msg: "precisa de 'task_id'"
        });
        return;
    }

    const task = req.body;

    try {
        const { id } = await tasks.add(task);
        res.json({
            success: true,
            id
        });
    }
    catch (error) {
        res.json({
            success: false,
            error: error
        });
    }
});

/* get many tasks */
router.get("/getMany", async (req: Request, res: Response) => {

    // const { filter } = req.body

    try {
        let tasksColection: any = []
        const data = await tasks.get();
        data.docs.map((task) => {
            tasksColection.push({
                id: task.id,
                data: task.data()
            });
        });
        res.json({
            success: false,
            tasksColection
        });
    }

    catch (error) {
        res.json({
            success: false,
            erro: error
        });
    }
});

/* get task by id */
router.get("/getById/:id", async (req: Request, res: Response) => {

    const id = req.params?.id;

    try {
        const task = await tasks.doc(id).get();

        if (!task.exists) {
            res.json({
                success: false,
                erro: `task ${id} nao encontrado`
            });
            return;
        }

        res.json({
            success: true,
            id,
            data: task.data()
        });
    }

    catch (error) {
        res.json({
            success: false,
            erro: error
        });
    }
});

export default router;