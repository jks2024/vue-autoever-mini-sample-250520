import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Members from "../pages/Members.vue";
import Layout from "../Layout.vue";
import ThemeSetting from "../pages/ThemeSetting.vue";
import News from "../pages/News.vue";
import ImageUploader from "../pages/ImageUploader.vue";
import Category from "../pages/Category.vue";
import Board from "../pages/Board.vue";
import BoardDetailPage from "../components/board/BoardDetailPage.vue";
import BoardWrite from "../pages/BoardWrite.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/home",
    component: Layout,
    children: [
      { path: "", component: Home },
      { path: "/members", component: Members },
      { path: "/theme", component: ThemeSetting },
      { path: "/news", component: News },
      { path: "/image", component: ImageUploader },
      { path: "/category", component: Category },
      { path: "/board", component: Board },
      { path: "/boarddetail/:id", component: BoardDetailPage },
      { path: "/boardwrite", component: BoardWrite },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
