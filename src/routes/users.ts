import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./fb";

const users = db.collection("users");

const router = express.Router();
router.use(bodyParser.json());

router.post("/", async (req: Request, res: Response) => {
    const { name, age } = req.body;

    try {
        const { id } = await users.add({ name, age });
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

router.get("/:id", async (req: Request, res: Response) => {

    const id = req.params.id || '';

    try {
        const user = await users.doc(id).get();

        if (!user.exists) {
            res.json({
                success: false,
                erro: `user ${id} nao encontrado`
            });
            return;
        }
        
        res.json({
            success: true,
            user: user.data()
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