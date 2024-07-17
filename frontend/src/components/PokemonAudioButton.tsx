import { ActionIcon, Box, Tooltip, rem } from "@mantine/core"
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { DOMAIN } from "../../config"

const AudioPlayer: React.FC<{ id: string }> = ({ id }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioSrc, setAudioSrc] = useState<string>("")

  useEffect(() => {
    // Fetch the MP3 file and set the source
    fetch(`http://${DOMAIN}:4000/sounds/${Number(id)}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setAudioSrc(url)
      })
      .catch((error) => console.error("Error fetching audio file:", error))

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audioRef.current?.addEventListener("ended", handleEnded)

    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded)
    }
  }, [id])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Box>
      {/* biome-ignore lint/a11y/useMediaCaption: No captions for this */}
      <audio ref={audioRef} src={audioSrc} />
      <Tooltip
        label={isPlaying ? "Pause" : "Play Pokemon sound"}
        position="top-end"
        withArrow
        arrowPosition="center"
      >
        <ActionIcon
          variant="light"
          size={rem(36)}
          radius="lg"
          color="gray"
          onClick={togglePlayPause}
        >
          {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
        </ActionIcon>
      </Tooltip>
    </Box>
  )
}

export default AudioPlayer
