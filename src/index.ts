import Client from "./structures/lib/Client";
export const client = new Client();

client.login(client.config.token);
