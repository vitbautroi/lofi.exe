import { useContext, useEffect, useRef, useState } from "react";
import { chill, jazzy, sleep } from "../../../data/dataSong";
import { StoreContext } from "../../../store";


const Player = () => {
    const valueCT = useContext(StoreContext)
    const song = valueCT.song
    const [currentSong, setCurrentSong] = useState(song[0])
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef()
    const volumeSong = valueCT.volumeSong

    const handlePlay = () => {
        setPlaying((s) => !s);
    };
    useEffect(() => {
        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        audioRef.current.volume = volumeSong / 100;
    });
    useEffect(() => {
        setCurrentSong(song[0])
    }, [song])

    const handleClickPrev = () => {
        const index = song.findIndex(x => x.name == currentSong.name)
        if (index == 0) {
            setCurrentSong(song[song.length - 1])
        } else {
            setCurrentSong(song[index - 1])
        }
        setPlaying(true)
    }
    const handleClickNext = () => {
        const index = song.findIndex(x => x.name == currentSong.name)
        if (index == song.length - 1) {
            setCurrentSong(song[0])
        } else {
            setCurrentSong(song[index + 1])
        }
        setPlaying(true)
    }

    return (
        <div className="flex items-center">
            <div className="absolute bottom-[4%] left-[10%] text-[20px] font-[600] text-white">{currentSong.name}</div>
            <div className="absolute flex items-center justify-center bottom-[4%] z-50 w-full">
                <audio loop src={currentSong.src} ref={audioRef}></audio>
                <div className="flex items-center gap-[20px]"><button className="w-[36px] h-[36px]">
                    <img src="./assets/img/player/prev.svg" alt="prev" onClick={handleClickPrev} />
                </button>
                    <button className="w-[54px] h-[54px]" onClick={handlePlay}>
                        {playing ? (
                            <img src="./assets/img/player/pause.svg" alt="" />
                        ) : (
                            <img src="./assets/img/player/play.svg" alt="" />
                        )}
                    </button>
                    <button className="w-[36px] h-[36px]">
                        <img src="./assets/img/player/next.svg" alt="next" onClick={handleClickNext} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Player;
