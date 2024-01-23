import { startChat } from "~/server/app/chatService";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const { userId, name, pre_prompt, first_message } = body;
  return await startChat(userId, name, pre_prompt, first_message);
});