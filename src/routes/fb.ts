import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const serviceAccount = require('../../key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

export default db;