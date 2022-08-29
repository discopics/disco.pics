import { toast as ts } from "react-hot-toast";

const opts = {
    style: {
        color: "rgb(244 63 94)",
        background: "rgba(251 113 133 / 0.10)",
    },
    iconTheme: {
        secondary: "#FFFFFF",
        primary: "rgb(244 63 94)",
    }
}

export const toast = (msg: string, type?: (
    "success" | "error" | "loading" | "default"
)) => {
    switch (type) {
        case "success":
            ts.success(msg, opts)
        case "error":
            return ts.error(msg, opts);
        case "loading":
            opts.iconTheme.secondary = opts.iconTheme.primary;
            opts.iconTheme.primary = "#FFFFFF";
            return ts.loading(msg, opts);
        default:
            return ts(msg, opts);
    }
};