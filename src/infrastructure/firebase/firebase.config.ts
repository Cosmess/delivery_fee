import * as admin from 'firebase-admin';
import { config } from 'dotenv';

config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const firestore = admin.firestore();
