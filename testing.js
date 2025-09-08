import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.ELEVENLABS_API_KEY;
const elevenlabs = new ElevenLabsClient({apiKey:API_KEY});
const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
  text: 'The first move is what sets everything in motion.',
  modelId: 'eleven_multilingual_v2',
  outputFormat: 'mp3_44100_128',
});

await play(audio);

