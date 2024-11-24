import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// 初始化Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// 添加测试函数
export const testFirebaseConnection = async () => {
    try {
        // 尝试添加一条测试数据
        const docRef = await addDoc(collection(db, 'test'), {
            message: 'Firebase connection test',
            timestamp: new Date()
        });
        console.log('Test document written with ID: ', docRef.id);
        return true;
    } catch (error) {
        console.error('Error testing Firebase connection: ', error);
        return false;
    }
};

export { app, db, storage, auth };