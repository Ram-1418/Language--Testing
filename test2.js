import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel
const MODEL = "eleven_v3"; // works in free tier

async function main() {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "ഹലോ, നിങ്ങള്‍ക്ക് എങ്ങനെയുണ്ട്?",
        model_id: MODEL,
      }),
    }
  );

  if (!response.ok) {
    console.error("❌ Error:", await response.text());
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync("output.mp3", buffer);
  console.log("✅ Saved as output.mp3");
}

main();
