import { Intents, PermissionString, PresenceData } from "discord.js";

export default {
    prefixes: process.env.NODE_ENV === "production" ? ["!"] : ["!!"],
    botName: "Mini Hack Bot",

    version: "1.0.0",
    admins: ["619284841187246090"],

    gitHub: "https://github.com/MiniHackTeam/bot",

    presence: {
        status: "online",
        activities: [
            {
                type: "PLAYING",
                name: "with /help"
            }
        ]
    } as PresenceData,

    hastebin: "https://h.inv.wtf",

    colors: {
        primary: "5865F2",
        success: "57F287",
        warning: "FEE75C",
        error: "ED4245"
    },

    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],

    requiredPermissions: [
        "EMBED_LINKS",
        "SEND_MESSAGES",
        "USE_EXTERNAL_EMOJIS"
    ] as PermissionString[],

    dataDog: {
        apiKey: process.env.DATADOG_API_KEY,
        baseURL: "https://app.datadoghq.com/api/v1/"
    },

    threadChannels: [
        "948367028320890900",
        "948356128440455168",
        "948353790350880789"
    ]
};

