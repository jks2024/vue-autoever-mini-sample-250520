<template>
  <CateTemplate>
    <CateInsert @insert="onInsert" />
    <CateList :cates="categories" @remove="onRemove" />
    <Modal
      :open="modalOpen"
      :close="closeModal"
      :confirm="confirmModal"
      type
      header="오류"
    >
      {{ modalContent }}
    </Modal>
  </CateTemplate>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CateInsert from "../components/category/CateInsert.vue";
import CateList from "../components/category/CateList.vue";
import CateTemplate from "../components/category/CateTemplate.vue";
import Modal from "../components/base/Modal.vue";
// import { cateList, cateInsert, cateDelete } from "@/api/board";
import axios from "axios";

const email = localStorage.getItem("email");
const categories = ref([]);
const selectedCategoryId = ref(null);
const modalOpen = ref(false);
const modalContent = ref("");

const loadCategory = async () => {
  // const res = await cateList();
  const res = await axios.get(`http://222.117.237.119:8111/api/category/list`);
  categories.value = res.data;
};

onMounted(loadCategory);

const onInsert = async (text) => {
  const res = await axios.post("http://222.117.237.119:8111/api/category/new", {
    email: email,
    categoryName: category,
  });
  if (res.data) await loadCategory();
  else alert("카테고리 등록 실패");
};

const onRemove = (id) => {
  selectedCategoryId.value = id;
  modalOpen.value = true;
  modalContent.value = "카테고리를 정말 삭제하시겠습니까?";
};

const closeModal = () => {
  modalOpen.value = false;
};

const confirmModal = async () => {
  modalOpen.value = false;
  if (selectedCategoryId.value !== null) {
    await axios.delete(
      `http://222.117.237.119:8111/api/category/delete/${selectedCategoryId.value}`
    );
    const res = await axios.get(
      `http://222.117.237.119:8111/api/category/list`
    );
    categories.value = res.data;
  }
};
</script>
