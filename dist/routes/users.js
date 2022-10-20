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
/* testes */
function teste() {
    return __awaiter(this, void 0, void 0, function* () {
        let usersColection = [];
        const data = yield fb_1.users.get();
        data.docs.map((user) => {
            usersColection.push({
                id: user.id,
                data: user.data(),
            });
        });
        console.log(usersColection);
    });
}
teste();
/* testes */
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
/* add user */
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age } = req.body;
    try {
        const { id } = yield fb_1.users.add({ name, age });
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
/* get many users */
router.get("/getMany", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter } = req.body;
    try {
        const manyUsers = yield fb_1.users.where("age", "==", 22);
        res.json({
            success: false,
            erro: 'error'
        });
    }
    catch (error) {
        res.json({
            success: false,
            erro: error
        });
    }
}));
/* get user by id */
router.get("/getById/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield fb_1.users.doc(id).get();
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
            user: user.data()
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
