import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FiMusic } from "react-icons/fi"; // Icon library, ensure you have react-icons installed

const MusikModal = () => {
	const [dialogOpen, setDialogOpen] = useState(true);
	const audioRef = useRef(null);

	const handlePlayMusic = () => {
		if (audioRef.current) {
			console.log("Volume before play:", audioRef.current.volume);
			audioRef.current.volume = 1; // Set volume ke maksimum
			audioRef.current
				.play()
				.then(() => console.log("Audio is playing"))
				.catch((error) => console.error("Error playing audio:", error));
		}
		setDialogOpen(false);
	};

	// Handle cancel button
	const handleCancel = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
		setDialogOpen(false);
	};

	// Handle music ended
	const handleMusicEnded = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0; // Reset audio to start
			audioRef.current.play(); // Replay audio
		}
	};

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex flex-col items-center">
						<FiMusic size={60} className="text-blue-500" />
						<small className="mt-2">Musik yung kai - blue (Official Audio)</small>
					</DialogTitle>
				</DialogHeader>
				<audio
					ref={audioRef}
					onEnded={handleMusicEnded} // Replay music when it ends
				>
					<source src="/blue.mp3" type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>

				<div className="flex gap-1 items-center justify-center">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="py-2 px-4 rounded-md bg-blue-950/80 text-white w-full"
						onClick={handlePlayMusic}>
						<small>Aktifin</small>
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="border py-2 px-4 rounded-md bg-red-500/80 text-white w-full"
						onClick={handleCancel}>
						<small>Ga pake Musik</small>
					</motion.button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MusikModal;
