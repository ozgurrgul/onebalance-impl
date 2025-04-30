export type SupportedSymbol = "ETH" | "USDC" | "LINK";

export type SupportedToken = Exclude<SupportedSymbol, "ETH">;
