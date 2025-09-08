import { useState } from "react";
import { useMusic } from "../../hooks/useMusic";
import Button from "../button/Button";
import bell from "../../assets/audio/creepy-halloween-bell-trap-melody-247720.mp3";

export default function MusicTester() {
  const [duration, setDuration] = useState<number>(20);
  const { isPlaying, isMuted, play, pause, resume, stop, mute } = useMusic();

  return (
    <div className="flex items-center gap-2 border rounded p-2 mb-2">
      <input
        type="number"
        min={0}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="border rounded px-2 py-1 w-24"
        placeholder="sec"
      />
      <Button text="Play" className="bg-blue-600" handleClick={() => play(bell, { duration })} />
      <Button
        text={isPlaying ? "Pause" : "Resume"}
        className="bg-yellow-600"
        handleClick={() => (isPlaying ? pause() : resume())}
      />
      <Button text="Stop" className="bg-red-600" handleClick={stop} />
      <Button text={isMuted ? "Unmute" : "Mute"} className="bg-gray-600" handleClick={() => mute()} />
    </div>
  );
}