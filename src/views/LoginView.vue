<template>
    <section class="form-access">
        <form @submit.prevent="sendLoginEmail">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    placeholder="email@host.com.br"
                    autofocus
                />
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="senha"
                    class="form-control"
                    placeholder="senha"
                />
            </div>

            <div class="form-group-inline form-check">
                <input type="checkbox" name="remember" id="rem" class="form-check-input" />
                <label for="rem" class="form-check-label">Lembre-me</label>
            </div>

            <div class="form-group">
                <button type="button" @click="sendLoginEmail" class="btn btn-primary">
                    Entrar
                </button>
            </div>

            <div class="form-group">
                <button
                    type="button"
                    @click="sendLoginGoogle"
                    class="btn btn-danger"
                >
                    Entrar com Google
                </button>
            </div>

            
            
            <div>
                <p>
                    Novo aqui?
                    <RouterLink to="/person-add">cadastre-se</RouterLink>
                </p>
                <p>
                    <router-link to="/person-recovery">esqueceu a senha?</router-link>
                </p>
            </div>
        </form>
    </section>
        <div v-if="errorMessage" class="alert alert-danger " role="alert">
            {{ errorMessage }} 
        </div>
</template>

<script setup lang="ts">
import { authService } from "@/core/service/auth.service";
import { ref } from "vue";
import router from "@/router";

const email = ref("");
const senha = ref("");
const errorMessage = ref("");

function sendLoginEmail() {
    errorMessage.value = ""; 
    authService
        .loginEmail(email.value, senha.value)
        .then((user) => {
            router.push("/"); 
        })
        .catch((error) => {
            errorMessage.value = error.message || "Erro ao fazer login.";
        });
}

function sendLoginGoogle() {
    errorMessage.value = ""; 
    authService
        .loginGoogle()
        .then((user) => {
            router.push("/"); 
        })
        .catch((error) => {
            errorMessage.value =
                error.message || "Erro ao fazer login com Google.";
        });
}
</script>

<style scoped>
@import "@/assets/css/login.css";



</style>
