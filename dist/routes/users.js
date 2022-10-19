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
const fb_1 = __importDefault(require("./fb"));
const users = fb_1.default.collection("users");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age } = req.body;
    try {
        const { id } = yield users.add({ name, age });
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
/* many users */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield users.get();
        res.json({
            // success: true,
            collections
        });
    }
    catch (error) {
        res.json({
            success: false,
            erro: error
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield users.doc(id).get();
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
