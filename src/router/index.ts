import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PersonAdd from "@/views/PersonAddView.vue";
import PersonProfile from "@/views/PersonProfileView.vue";
import Service from "@views/ServiceView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Inicio",
        component: HomeView,
    },
    {
        path: "/login",
        name: "Entrar",
        component: () => import("../views/LoginView.vue"),
    },
    {
        path: "/person-add",
        name: "Adicionar Usuário",
        component: PersonAdd,
    },
    {
        path: "/person-edit/:id",
        name: "Editar Usuário",
        component: PersonAdd,
    },
    {
        path: "/profile/:id",
        name: "Perfil",
        component: PersonProfile,
    },
    {
        path: "/service/:id",
        name: "Service",
        component: () => import ("../views/ServiceView.vue"),
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
