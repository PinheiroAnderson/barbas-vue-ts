<template>
    <section>
        <form
            id="formPersonAdd"
            class="bg-yellow container p-5"
            enctype="multipart/form-data"
            @submit.prevent="sendData()"
        >
            <h1 class="text-center">Faça seu cadastro</h1>
            {{ person }}

            <InputValue
                v-model="person.name"
                type="text"
                label="Nome"
                message="Nome invalido no campo"
                :required="true"
            ></InputValue>

            <InputValue
                v-model="person.email"
                type="email"
                label="E-mail"
                message="Email invalido"
                :required="true"
                :disabled="person?.id"
            ></InputValue>

            <InputValue
                v-if="!person?.id"
                v-model="person.password"
                type="password"
                label="Senha"
                message="Senha invalida ou fora da característica"
                :required="true"
            ></InputValue>

            <InputValue
                v-if="!person?.id"
                v-model="confPass"
                type="password"
                label="Confirmar Senha"
                message="Senhas diferentes"
                :required="true"
                :validation="person.password == confPass"
            ></InputValue>

            <InputValue
                v-model="person.telephone"
                type="tel"
                label="Telefone"
                message="Telefone invalido"
                :required="true"
            ></InputValue>

            <div class="my-3 form-group flex-row gap-2">
                <button type="reset">Cancelar</button>
                <button type="submit" id="submitForm">
                  <Span v-if="person?.id">Editar</Span>
                  <Span v-else>Cadastar</Span>
                </button>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router";
import { Person } from "@/core/domain/Person";
import { personService } from "@/core/service/person.service";
import InputValue from "@/components/InputValue.vue";

const confPass = ref<string>("");
const person = ref<Person>(new Person());

onMounted(() => {
    const idRouter = router.currentRoute.value.params.id?.toString();
    if (idRouter) {
        personService.get(idRouter).then(res => {
            if (res) {
                person.value = res;
            }
        });
    }
});

function sendData() {
    if (person.value?.id) {
        personService
            .edit(person.value)
            .then(() => {
                alert("Editado");
            })
            .catch(() => {
                alert("Error ao editar");
            });
    } else {
        personService.add(person.value);
    }
}
</script>

<style scoped>
@import "@/assets/css/form.css";
</style>
