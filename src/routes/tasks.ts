import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { tasks } from './fb';

const router = express.Router();
router.use(bodyParser.json());

router.post("/add", async (req: Request, res: Response) => {
    const { user_id } = req.body;

    if (!user_id) {
        res.json({
            success: false,
            msg: "precisa de 'user_id'"
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

export default router;