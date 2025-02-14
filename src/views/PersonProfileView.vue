<template>
    <div class="container bg-body h-100">
        {{ person }}
        <div>
            <img :src="person?.photo" alt="" />
        </div>
        <div>
            <p>
                <b>Nome: </b>
                <br />{{ person?.name }}
            </p>
            <p>
                <b>Email: </b>
                <br />{{ person?.email }}
            </p>
        </div>
        <div>
            <button
                type="button"
                @click="$router.push(`/person-edit/${person?.id}`)"
            >
                Editar
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import { personService } from "@/core/service/person.service";
import { Person } from "@/core/domain/Person";

const person = ref<Person | undefined>();

onMounted(() => {
    const idRouter = router.currentRoute.value.params.id.toString();
    personService.get(idRouter).then(res => {
        if (res) {
            person.value = res;
        }
    });
});
</script>

<style scoped></style>
