export default () => {
  const host = 'https://api.fary.chat';
  const chatServiceName = 'chat-service';
  const tokenUrl = `${host}/${chatServiceName}/token`;
  const chatUrl = `${host}/${chatServiceName}/chat/v2/stream`;

  return { tokenUrl, chatUrl };
};
