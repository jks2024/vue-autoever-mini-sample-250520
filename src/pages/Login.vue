<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-white px-4"
  >
    <h1 class="text-2xl font-semibold mb-8">Login</h1>

    <div class="w-full max-w-md mx-auto space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="이메일"
        class="input-box"
      />
      <input
        v-model="pw"
        type="password"
        placeholder="비밀번호"
        class="input-box"
      />
      <button
        @click="onLogin"
        :disabled="!canLogin"
        class="w-full py-3 mt-4 rounded-xl text-white font-bold"
        :class="
          canLogin
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
        "
      >
        로그인
      </button>

      <div class="text-sm text-center mt-4">
        계정이 없으신가요?
        <router-link to="/signup" class="text-blue-500 hover:underline">
          회원가입
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { useAuthApi } from "../api/auth";

const router = useRouter();
const modal = useModalStore();
const { login } = useAuthApi();

const email = ref("");
const pw = ref("");

const canLogin = computed(() => email.value.length > 0 && pw.value.length > 0);

async function onLogin() {
  if (!canLogin.value) return;

  try {
    const res = await login(email.value, pw.value);

    if (res.data) {
      modal.open({
        title: "로그인 완료",
        message: "환영합니다!",
        hasCancel: false,
        onConfirm: () => {
          localStorage.setItem("isLogin", "TRUE");
          localStorage.setItem("email", email.value);
          router.push("/home");
        },
      });
    } else {
      modal.open({
        title: "로그인 실패",
        message: `이메일 또는 비밀번호를 확인 하세요`,
        hasCancel: false,
      });
    }
  } catch (err) {
    modal.open({
      title: "로그인 실패",
      message: `서버 통신 실패 : 에러 코드를 확인 하세요`,
      hasCancel: false,
    });
  }
}
</script>

<style scoped>
.input-box {
  @apply w-full px-4 py-3 border border-gray-400 rounded-full;
}
</style>
