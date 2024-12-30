import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Swal from "sweetalert2";
import Particles from "react-particles";
import { loadSnowPreset } from "tsparticles-preset-snow";

import NameDialog from "./components/nameDialog";
import Footer from "./components/footer";
import CircleHomeImage from "./components/circleHomeImage";

const list_text = [
	{
		textHead: "",
		text: "Aku punya sesuatu niii 👻👻",
	},
	{
		textHead: "kira-kira apa ya 🤔🤔",
		text: "hmmm...",
	},
	{
		textHead: "Coba tekan balonya !!",
		text: "",
	},
	{
		textHead: "Happy Birthday, ",
		text: "Cie yang nambah tuaa, hehe \nMoga panjang umur yaa, \nbisa kali traktir aku wkwk 👻",
	},
];

const list_gambar = [
	"https://media.tenor.com/nzouT6uufQ0AAAAj/peach-goma.gif",
	"https://media.tenor.com/JFu3-alzcf0AAAAj/peach-goma.gif",
	"https://media1.tenor.com/m/nIDGGyhAm7EAAAAd/cake-birthday.gif",
	"https://media.tenor.com/tqRmCBNb4nYAAAAi/tonton-tonton-friends.gif",
];

function App() {
	const [text, setText] = useState([]);
	const [userName, setUserName] = useState("");

	const [showSnow, setShowSnow] = useState(false);
	const [alertShown, setAlertShown] = useState(false);

	const [isNext, setIsNext] = useState(0);
	const [isImageNext, setIsImageNext] = useState(0);

	const [isNameEntered, setIsNameEntered] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [animatePrev, setAnimatePrev] = useState(false);

	const typingSpeed = 100;
	const delayAfterTyping = 500;

	const controlsImage = useAnimation();

	const [clickCount, setClickCount] = useState(0);

	function createSnowfall() {
		const snowContainer = document.createElement("div");
		snowContainer.className = "snow-container";
		document.body.appendChild(snowContainer);

		for (let i = 0; i < 50; i++) {
			const snow = document.createElement("div");
			snow.className = "snow";

			// Random values for each snowflake
			const randomLeft = Math.random() * 100;
			const randomSize = Math.random() * 4 + 2;
			const randomDuration = Math.random() * 3 + 2;
			const randomLeftEnd = randomLeft + (Math.random() * 20 - 10);

			snow.style.setProperty("--left-ini", `${randomLeft}vw`);
			snow.style.setProperty("--left-end", `${randomLeftEnd}vw`);
			snow.style.width = `${randomSize}px`;
			snow.style.height = `${randomSize}px`;
			snow.style.opacity = Math.random() * 0.6 + 0.4;
			snow.style.animationDuration = `${randomDuration}s`;
			snow.style.animationDelay = `${Math.random() * 2}s`;

			snowContainer.appendChild(snow);
		}

		setTimeout(() => {
			document.body.removeChild(snowContainer);
		}, 5000);
	}

	const showBirthdayAlert = async () => {
		setAlertShown(true);
		const result = await Swal.fire({
			title: "🎉 Happy Birthday! 🎉",
			text: "Are you ready for your surprise?",
			icon: "success",
			confirmButtonText: "Yes!",
			allowOutsideClick: false,
			background: "#fff",
			backdrop: `rgba(0,0,0,0.4)`,
		});

		if (result.isConfirmed) {
			createSnowfall();
			setIsNext(3);
			setIsImageNext(2);
		}
		setAlertShown(false);
	};

	const handleBalloonClick = (e) => {
		e.target.classList.add("popped");
		setClickCount((prevCount) => {
			const newCount = prevCount + 1;
			if (newCount === 3) {
				setTimeout(() => {
					showBirthdayAlert();
				}, 500);
			}
			return newCount;
		});
	};

	// Animasi untuk teks
	useEffect(() => {
		const fullText = list_text[isNext]?.text || "";
		let currentIndex = 0;
		setText([]);
		setShowButton(false);

		if (animatePrev && list_text[isNext]?.text !== "") {
			const typeCharacter = () => {
				if (currentIndex < fullText.length) {
					const currentChar = fullText[currentIndex];
					if (currentChar === "\n") {
						setText((prevText) => [...prevText, <br key={currentIndex} />]);
						currentIndex++;
						setTimeout(typeCharacter, 500);
					} else {
						setText((prevText) => [...prevText, currentChar]);
						currentIndex++;
						setTimeout(typeCharacter, typingSpeed);
					}
				} else {
					setTimeout(() => {
						setShowButton(true);
					}, delayAfterTyping);
				}
			};

			// Mulai animasi
			typeCharacter();
		}
	}, [isNext, animatePrev]);

	// Ganti teks ucapan selamat ulang tahun
	useEffect(() => {
		list_text[3].textHead = `Happy Birthday, ${userName} 🥳🥳`;
	}, [userName]);

	// Animasi untuk komponen
	useEffect(() => {
		if (isNameEntered) {
			controlsImage
				.start({
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
				})
				.then(() => {
					setAnimatePrev(true);
				});
		}
	}, [isNameEntered]);

	// Handling Page Transition
	useEffect(() => {
		if (isNext === 1) {
			const timeoutId = setTimeout(() => {
				setIsNext(2);
			}, 3000);

			return () => clearTimeout(timeoutId);
		}
	}, [isNext]);

	// Button klik disini
	const handleNext = async () => {
		await controlsImage.start({
			opacity: 0,
			scale: 0,
			transition: { duration: 0.4 },
		});

		setIsNext((prev) => (prev + 1) % list_text.length);
		setIsImageNext((prev) => (prev + 1) % list_gambar.length);

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

	return (
		<div className="flex flex-col items-center justify-start pt-20 h-screen w-full gap-5 relative overflow-hidden">
			{showSnow && (
				<Particles
					id="snow"
					init={particlesInit}
					options={{
						preset: "snow",
						particles: {
							number: {
								value: 100,
							},
							move: {
								enable: true,
								speed: 3,
							},
						},
					}}
				/>
			)}

			{!alertShown && (
				<>
					{/* COVER */}
					<div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center">
						<div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
					</div>
					{/* END COVER */}

					{/* HEADER */}
					{isNameEntered && (
						<span className="flex flex-col items-center justify-center gap-3 z-10">
							{/* CIRCLE IMG */}
							<CircleHomeImage
								controlsImage={controlsImage}
								isNext={isImageNext}
								list_gambar={list_gambar}
							/>
							{/* END CIRCLE IMG */}

							<motion.h1
								className="font-semibold text-white text-2xl"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.5,
									scale: { type: "spring", stiffness: 100, damping: 10 },
								}}>
								Hai, {userName} ✨✨
							</motion.h1>
						</span>
					)}
					{/* END HEADER */}

					{/* BODY */}
					{animatePrev && (
						<motion.span
							className="w-3/4 border p-2 rounded-tl-xl rounded-br-xl z-10"
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								scale: { type: "spring", stiffness: 100, damping: 10 },
							}}>
							<div
								className={`bg-black/30 px-5 ${
									isNext == 0 ? "pt-7 pb-3" : "py-7"
								} rounded-tl-xl rounded-br-xl flex flex-col text-center gap-3 text-white`}>
								{list_text[isNext]?.textHead && (
									<motion.h1
										className="font-semibold"
										initial={{ opacity: 0, scale: 0 }}
										animate={{
											opacity: 1,
											scale: 1,
											transition: {
												duration: 0.5,
												scale: { type: "spring", stiffness: 100, damping: 10 },
											},
										}}
										key={isNext}>
										{list_text[isNext]?.textHead}
									</motion.h1>
								)}

								{text && text.length > 0 && (
									<p className="font-semibold">
										{text}
										<span className="animate-blink">|</span>
									</p>
								)}

								{isNext === 2 && (
									<motion.div
										className="flex justify-center gap-2"
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { duration: 0.5 },
										}}
										key={isNext}>
										{[1, 2, 3].map((id) => (
											<motion.div
												key={id}
												className="balloon"
												onClick={handleBalloonClick} // Fungsi klik
												initial={{ opacity: 0, scale: 0 }}
												animate={{
													opacity: 1,
													scale: 1,
													transition: {
														delay: id * 0.2, // Memberikan jeda antar balon
														duration: 0.5,
														scale: { type: "spring", stiffness: 100, damping: 10 },
													},
												}}>
												🎈
											</motion.div>
										))}
									</motion.div>
								)}

								{showButton && isNext == 0 && (
									<span className="w-full flex items-center justify-end gap-5 pe-1 font-thin">
										<motion.button
											onClick={handleNext}
											initial={{ opacity: 0, scale: 0 }}
											animate={{ opacity: 1, scale: 1 }}
											whileTap={{ scale: 0.5 }}
											transition={{
												duration: 0.4,
												scale: { type: "spring", stiffness: 100, damping: 10 },
											}}>
											<small>Klik Sini!</small>
										</motion.button>
									</span>
								)}
							</div>
						</motion.span>
					)}
					{/* END BODY */}

					{/* DIALOG */}
					<NameDialog
						setUserName={setUserName}
						userName={userName}
						setIsNameEntered={setIsNameEntered}
					/>
					{/* DIALOG */}

					{/* FOOTER */}
					<Footer />
					{/* END FOOTER */}
				</>
			)}
		</div>
	);
}

export default App;
