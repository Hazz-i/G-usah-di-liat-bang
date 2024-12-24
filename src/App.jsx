import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const list_gambar = [
	{
		url: "https://media.tenor.com/nzouT6uufQ0AAAAj/peach-goma.gif",
		text: "Aku punya sesuatu Nii 👻👻",
	},
	{
		url: "https://media.tenor.com/JFu3-alzcf0AAAAj/peach-goma.gif",
		text: "kira-kira apa ya 🤔🤔",
	},
	{
		url: "https://media.tenor.com/tqRmCBNb4nYAAAAi/tonton-tonton-friends.gif",
		text: "Happy Birthday 🎉🎉",
	},
];

function App() {
	const [isNext, setIsNext] = useState(0);

	const [name, setName] = useState("");
	const [text, setText] = useState("");

	const [dialogOpen, setDialogOpen] = useState(true);
	const [userName, setUserName] = useState("");
	const [isNameEntered, setIsNameEntered] = useState(false);
	const [error, setError] = useState("");
	const [showButton, setShowButton] = useState(false);
	const [isNameAnimationComplete, setIsNameAnimationComplete] = useState(false);
	const typingSpeed = 100;
	const delayAfterTyping = 500;

	// Tambahkan state untuk mengontrol animasi next
	const [animateNext, setAnimateNext] = useState(false);

	const controls = useAnimation();
	const controlsImage = useAnimation();

	// Type out the greeting with name first
	useEffect(() => {
		if (!isNameEntered || !userName) return;

		const fullText = `Allow, ${userName} ✨✨`;
		let currentIndex = -1;
		setName("");
		setIsNameAnimationComplete(false);

		const intervalId = setInterval(() => {
			currentIndex++;
			if (currentIndex < fullText.length) {
				setName((prevName) => prevName + fullText[currentIndex]);
			} else {
				clearInterval(intervalId);
				// Set flag when name animation is complete
				setTimeout(() => {
					setIsNameAnimationComplete(true);
				}, delayAfterTyping);
			}
		}, typingSpeed);

		return () => clearInterval(intervalId);
	}, [isNameEntered, userName]);

	// Type out the message text after name animation
	useEffect(() => {
		if (!isNameAnimationComplete) return;

		const fullText = list_gambar[isNext].text;
		let currentIndex = -1;
		setText("");
		setShowButton(false);

		const intervalId = setInterval(() => {
			currentIndex++;
			if (currentIndex < fullText.length) {
				setText((prevText) => prevText + fullText[currentIndex]);
			} else {
				clearInterval(intervalId);
				setTimeout(() => {
					setShowButton(true);
				}, delayAfterTyping);
			}
		}, typingSpeed);

		return () => {
			clearInterval(intervalId);
		};
	}, [isNext, isNameAnimationComplete]);

	const handleNext = async () => {
		await controlsImage.start({
			opacity: 0,
			scale: 0,
			transition: { duration: 0.4 },
		});

		setIsNext((prev) => (prev + 1) % list_gambar.length);

		controlsImage.start({
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.8,
				scale: {
					type: "spring",
					stiffness: 100,
					damping: 10,
				},
			},
		});
	};

	const handleDialogClose = () => {
		if (!userName.trim()) {
			setError("isi dulu dong namanya!");
			return;
		}
		setIsNameEntered(true);
		setDialogOpen(false);
		setError("");
	};

	// Animasi untuk komponen
	useEffect(() => {
		if (isNameEntered) {
			controls.start({
				opacity: 1,
				scale: 1,
				transition: {
					duration: 0.5,
					scale: {
						type: "spring",
						stiffness: 100,
						damping: 10,
					},
				},
			});
			controlsImage.start({
				opacity: 1,
				scale: 1,
				transition: {
					duration: 0.5,
					scale: {
						type: "spring",
						stiffness: 100,
						damping: 10,
					},
				},
			});
		}
	}, [isNameEntered, controls, controlsImage]);

	return (
		<div className="flex flex-col items-center justify-start pt-20 h-screen w-full gap-5 relative overflow-hidden">
			<div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center">
				<div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
			</div>

			{/* HEDAER */}
			{isNameEntered && (
				<span className="flex flex-col items-center justify-center gap-3 z-10">
					<motion.div
						className="h-28 w-28 rounded-full border overflow-hidden flex items-center justify-center bg-gray-400/30"
						initial={{ opacity: 0, scale: 0 }}
						animate={controlsImage}>
						<span className="h-24 w-24 rounded-full overflow-hidden">
							<img
								src={list_gambar[isNext].url}
								alt="Gambar animasi"
								className="w-full h-full object-cover"
							/>
						</span>
					</motion.div>
					<h1 className="font-semibold text-white text-2xl">{name || " "}</h1>
				</span>
			)}
			{/* END HEDAER */}

			{/* BODY */}
			{isNameEntered && (
				<motion.span
					className="w-3/4 border p-2 rounded-tl-xl rounded-br-xl z-10"
					initial={{ opacity: 0, scale: 0 }}
					animate={controls}>
					<div className="bg-black/30 px-5 pt-7 pb-3 rounded-tl-xl rounded-br-xl flex flex-col items-center justify-center gap-3 text-white">
						<p className="font-semibold">
							{text || " "}
							<span className="animate-blink">|</span>
						</p>
						{showButton && (
							<span className="w-full flex items-center justify-end gap-5 pe-1 font-thin">
								<button onClick={handleNext}>
									<small>Klik Sini!</small>
								</button>
							</span>
						)}
					</div>
				</motion.span>
			)}

			<span className="z-10">
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>
								<small>Masukin Nama Kamu</small>
							</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-1">
							<Input
								id="name"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								className="col-span-3"
								placeholder="Ketik nama kamu..."
								required
							/>
							<motion.button
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.8 }}
								className="border py-1 rounded-md bg-black/30 text-white hover:bg-white hover:text-black hover:border-black transition-colors"
								onClick={handleDialogClose}>
								<small>Sudah Min !!</small>
							</motion.button>
							{error && <p className="text-red-500 text-sm text-center">{error}</p>}
						</div>
					</DialogContent>
				</Dialog>
			</span>
			{/* END BODY */}

			{/* FOOTER */}
			<footer className="absolute bottom-1 w-full text-center text-white z-10">
				<p className="text-sm font-thin">
					&copy; {new Date().getFullYear()} Created by{" "}
					<a
						href="https://i.pinimg.com/736x/64/63/55/6463553cc2154f1799a55c29285e6be3.jpg"
						className="text-blue-400">
						akuuuu
					</a>
				</p>
			</footer>
			{/* END FOOTER */}
		</div>
	);
}

export default App;
