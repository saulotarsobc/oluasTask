import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { users } from "./fb";

/* testes */
// async function teste() {
//     let usersColection: any = []
//     const data = await users.get();
//     data.docs.map((user) => {
//         const id = user.id;
//         const data = user.data()
//         usersColection.push({
//             id,
//             data
//         });
//     });
//     console.log(usersColection)
// }
// teste();
/* testes */

const router = express.Router();
router.use(bodyParser.json());

/* add user */
router.post("/add", async (req: Request, res: Response) => {
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

/* get many users */
router.get("/getMany", async (req: Request, res: Response) => {

    // const { filter } = req.body

    try {
        let usersColection: any = []
        const data = await users.get();
        data.docs.map((user) => {
            usersColection.push({
                id: user.id,
                data: user.data()
            });
        });
        res.json({
            success: false,
            usersColection
        });
    }

    catch (error) {
        res.json({
            success: false,
            erro: error
        });
    }
});

/* get user by id */
router.get("/getById/:id", async (req: Request, res: Response) => {

    const id = req.params?.id;

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
            id,
            data: user.data()
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