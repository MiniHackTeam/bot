import { TextChannel } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler.js";
import BetterMessage from "../../../lib/extensions/BetterMessage.js";

export default class MessageCreate extends EventHandler {
    override async run(message: BetterMessage) {
        this.client.dataDog.increment("messagesSeen");
        if (message.author.bot) return;
        // @ts-ignore
        else if (this.client.mongo.topology.s.state !== "connected") return;

        if (this.client.config.threadChannels.includes(message.channel.id)) {
            const threadId = await this.client.mongo
                .db("data")
                .collection("misc")
                .findOneAndUpdate(
                    { threadCount: { $exists: true } },
                    { $inc: { threadCount: 1 } },
                    { upsert: true, returnDocument: "after" }
                );

            await (message.channel as TextChannel).threads.create({
                startMessage: message,
                autoArchiveDuration: "MAX",
                reason: "Automatic thread system.",
                name: `Comments (${threadId.value?.threadCount || 0})`
            });
        }

        return this.client.textCommandHandler.handleCommand(message);
    }
}

