const https = require("https");

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };

  const key = process.env.BZZOIRO_API_KEY;
  if (!key) return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "BZZOIRO_API_KEY not set in Netlify environment variables" }) };

  const path = event.queryStringParameters?.path || "/leagues/";
  const url = `https://sports.bzzoiro.com/api${path}`;

  try {
    const data = await new Promise((resolve, reject) => {
      const req = https.get(url, { headers: { "Authorization": "Token " + key } }, (res) => {
        let body = "";
        res.on("data", c => body += c);
        res.on("end", () => { try { resolve(JSON.parse(body)); } catch(e) { reject(new Error("Invalid JSON")); } });
      });
      req.on("error", reject);
      req.setTimeout(10000, () => { req.destroy(); reject(new Error("Timeout")); });
    });
    return { statusCode: 200, headers: cors, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: e.message }) };
  }
};
