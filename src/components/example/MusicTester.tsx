import Button from "../button/Button";
import { useMusic } from "../../hooks/useMusic";
import bell from "../../assets/audio/creepy-halloween-bell-trap-melody-247720.mp3";

/**
 * Component di test per l'hook useMusic.
 */
export default function MusicTester() {
  const { isPlaying, isMuted, play, pause, resume, stop, mute } = useMusic();

  // Durata casuale tra 5 e 10 secondi (richiesta)
  function randomDurationSec() {
    return Math.floor(5 + Math.random() * 6);
  }

  return (
    <div className="flex items-center gap-2 border rounded p-2 mb-2">
      <Button
        text="Play"
        className="bg-blue-600"
        handleClick={() => play(bell, randomDurationSec())}
      />
      <Button
        text={isPlaying ? "Pause" : "Resume"}
        className="bg-yellow-600"
        handleClick={() => (isPlaying ? pause() : resume())}
      />
      <Button
        text="Stop"
        className="bg-red-600"
        handleClick={stop}
      />
      <Button
        text={isMuted ? "Unmute" : "Mute"}
        className="bg-gray-600"
        handleClick={() => mute()}
      />
    </div>
  );
}
