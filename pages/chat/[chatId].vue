<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import Message from "~/components/Message.vue";
import { Chat } from "~/types/Chat";
import ChatHeader from "~/components/ChatHeader.vue";
import Loader from "~/components/Loader.vue";

const chatId = useRoute().params.chatId;

const { data: chat } = await useFetch<Chat>("/api/chat/" + chatId, { method: "GET" });
if (!chat.value) throw createError({ statusCode: 404, message: "Chat not found" });

const loading = ref(false);

const prompt = ref("");

const scrollChat = ref(null);
// const scrollToBottom = () => {
//   toBottom.value?.scrollIntoView({ behavior: 'smooth' });
// }

async function sendMessage(regenerate = false) {
  if (prompt.value === "" && !regenerate) return;
  const message = ref(prompt.value);
  prompt.value = ""
  loading.value = true;
  try {
    chat.value.messages.push({
      role: "user",
      content: message.value,
    });
    const { data } = await useFetch("/api/chat", {
      method: "POST",
      body: {
        chat: chat.value,
        message: message.value,
      },
    });
    if (data.value) {
      chat.value = data.value.chat;
    }
    message.value = "";
    loading.value = false;
  } catch (e) {
    console.error(e);
    useErrorToast("Oups, j'ai eu un problème :(");
    loading.value = false;
  }
}
import { getCurrentInstance } from 'vue';

const vm = getCurrentInstance();

const scrollToBottom = () => {
  if (!vm.refs.myScrollableDiv) retuwrn;
  nextTick(() => {
    vm.refs.myScrollableDiv.scrollIntoView({ behavior: 'smooth' });
  });
};

onMounted(scrollToBottom); // Use onMounted hook
</script>

<template>
  <div class="relative flex flex-col container_size h-full">
    <div class="absolute back -z-10 scale-150 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    <ChatHeader :name="chat.name" :chat-id="chat.id" />
    <div ref="myScrollableDiv" class="bg-white flex-1 p-4 overflow-y-auto flex-col gap-4">
      <div
        v-for="msg in chat.messages"
        :key="msg.id"
        class="flex flex-col mb-4"
        :class="msg.role === 'assistant' ? 'items-start' : 'items-end'"
      >
        <Message :message="msg" :direction="msg.role === 'assistant' ? 'left' : 'right'" />
      </div>
      <Loader v-if="loading" />
    </div>
    <div class="bg-white">
      <footer class="p-4 flex flex-col items-center gap-4">
        <div class="flex items-center w-full">
          <textarea
            ondragstart="return false"
            v-model="prompt"
            :disabled="loading"
            rows="3"
            class="caret-green-600 w-full bg-slate-200 p-4 text-slat-600 border-none outline-none shadow-xl border-2 border-accent rounded-xl"
            :placeholder="$t('chat.writeMessage')"
            @keyup.enter="sendMessage"
          />
          <button :disabled="loading" @click="sendMessage" class="flex items-center justify-center">
            <PaperAirplaneIcon
              class="text-green-600 cursor-pointer h-8 w-8 ml-4 hover:scale-125 transform transition duration-200 ease-in-out"
            />
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">

textarea {
  resize: none;
}
.container_size {
  position: fixed;
  width: calc(100% - 16rem);
}

@media (max-width: 768px) {
  .container_size {
    width: 100%;
  }
}

.back {
  width: 60%;
  height: 30%;
  background: conic-gradient(
    from 230.29deg at 51.63% 52.16%,
    rgb(36, 0, 255) 0deg,
    rgb(0, 135, 255) 40deg,
    rgb(108, 39, 157) 198.75deg,
    rgb(24, 38, 163) 251.25deg,
    rgb(54, 103, 196) 301.88deg,
    rgb(105, 30, 255) 360deg
  );
  filter: blur(200px);
}
</style>
