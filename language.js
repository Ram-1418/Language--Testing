


// malayalam.js
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.ELEVENLABS_API_KEY // 🔑 Replace with your ElevenLabs API key

// Step 1: Get list of voices
async function getVoices() {
  const response = await fetch("https://api.elevenlabs.io/v1/voices", {
    method: "GET",
    headers: {
      "xi-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching voices: ${response.statusText}`);
  }

  const data = await response.json();
  return data.voices;
}

// Step 2: Generate Malayalam speech
async function textToSpeech(voiceId, text) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_v3", // supports Malayalam
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`TTS failed: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync("malayalam.mp3", Buffer.from(arrayBuffer));
  console.log(`✅ Malayalam speech saved as malayalam.mp3`);
}

// Step 3: Run everything
async function main() {
  try {
    const voices = await getVoices();

    if (!voices || voices.length === 0) {
      console.error("No voices available.");
      return;
    }

    // Pick the first available voice
    const selectedVoice = voices[0];
    console.log(`🎤 Using voice: ${selectedVoice.name} (${selectedVoice.voice_id})`);

    // Example Malayalam text
    const malayalamText = "സുഖമാണോ? ഇന്ന് നിങ്ങളുടെ ദിവസം എങ്ങനെയായിരുന്നു?";

    await textToSpeech(selectedVoice.voice_id, malayalamText);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
