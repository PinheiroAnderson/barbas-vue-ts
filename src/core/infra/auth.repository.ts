//https://firebase.google.com/docs/auth/web/start?hl=pt&authuser=0#web-namespaced-api_1

import { provide } from "vue";
import { app } from "./firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider;

export function addAuth(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function removeAuth() {
    return auth.currentUser?.delete();
}

export function postLoginEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function loginGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log("Usuário logado com sucesso:", user);
        console.log("Token de acesso:", token);
        return { user, token };
    } catch (error) {
        console.error("Erro ao fazer login com Google:", Error, error)
        return await Promise.reject(error);
    }
}
