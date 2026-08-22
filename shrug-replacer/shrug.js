import { patcher } from "@revenge/api";

export const manifest = {
    name: "Shrug Text Replacer",
    description: "Converts !shrug into the classic ¯\\_(ツ)_/¯ ASCII art automatically.",
    authors: [{ name: "You" }],
    version: "1.0.0",
    main: "index.js"
};

export default {
    onLoad() {
        const MessageModule = revenge.modules.findByProps("sendMessage");
        this.unpatch = patcher.before(MessageModule, "sendMessage", (args) => {
            if (args && args[1]) {
                let message = args[1]; 
                if (message && message.content && message.content.includes("!shrug")) {
                    message.content = message.content.replace(/!shrug/g, "¯\\_(ツ)_/¯");
                }
            }
        });
    },
    onUnload() {
        if (this.unpatch) this.unpatch();
    }
};
