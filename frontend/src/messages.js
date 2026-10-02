export function mergeMessages(previous, incoming) {
  const messages = new Map(previous.map((message) => [message.id, message]));
  for (const message of incoming) messages.set(message.id, message);
  return [...messages.values()].sort((a, b) =>
    new Date(a.created_at) - new Date(b.created_at) || a.id - b.id
  );
}
