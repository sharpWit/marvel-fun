const ts = new Date().getTime();

const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY || ""; // Provide a default value if undefined
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY || ""; // Provide a default value if undefined

const hash = require("crypto")
  .createHash("md5")
  .update(ts + privateKey + publicKey)
  .digest("hex");

const apiUrl = "https://gateway.marvel.com/v1/public/characters";
const apiKeyParam = `apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`;
const tsParam = `ts=${ts}`;
const hashParam = `hash=${hash}`;

export const marvelURL = `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}`;
