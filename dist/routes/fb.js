"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.users = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const serviceAccount = require('../../key.json');
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount)
});
const db = (0, firestore_1.getFirestore)();
/* exports */
exports.users = db.collection('users');
exports.tasks = db.collection('tasks');
// export default db;
