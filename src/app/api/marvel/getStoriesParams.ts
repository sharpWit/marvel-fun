const getStoriesParams = () => {
  const ts = new Date().getTime();

  const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY || "";

  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY || "";

  const hash = require("crypto")
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");

  const apiUrl = "https://gateway.marvel.com/v1/public/stories";

  const apiKeyParam = `apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`;

  const tsParam = `ts=${ts}`;

  const hashParam = `hash=${hash}`;

  return { apiUrl, apiKeyParam, tsParam, hashParam };
};

// Usage
export const { apiUrl, apiKeyParam, tsParam, hashParam } = getStoriesParams();
