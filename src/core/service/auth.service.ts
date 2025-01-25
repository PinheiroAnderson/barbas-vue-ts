import { postLoginEmail, loginGoogle as googleLogin } from "@/core/infra/auth.repository";
import { Person } from "../domain/Person";

export const authService = {
    loginEmail,
    loginGoogle,
};

async function loginEmail(email: string, password: string) {
    return await postLoginEmail(email, password)
        .then(res => {
            const user = res.user;
            return <Person>{
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            };
        })
        .catch(error => {
            console.error(">>> error:", error);
            throw new Error("Email ou senha inválidos!");
        });
}

async function loginGoogle(): Promise<Person> {
    try {
        const { user } = await googleLogin();
        return <Person>{
            email: user.email,
            name: user.displayName || "Usuário Google",
            photo: user.photoURL || "URL padrão da foto",
        };
    } catch (error) {
        console.error("Erro ao fazer login com o Google:", error);
        throw new Error("Não foi possível realizar o login com o Google!");
    }
}
