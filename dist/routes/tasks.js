"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fb_1 = require("./fb");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { id } = yield fb_1.tasks.add(task);
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
}));
/* get many tasks */
router.get("/getMany", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { filter } = req.body
    try {
        let tasksColection = [];
        const data = yield fb_1.tasks.get();
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
}));
/* get task by id */
router.get("/getById/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const task = yield fb_1.tasks.doc(id).get();
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
}));
exports.default = router;
