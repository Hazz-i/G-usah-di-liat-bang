import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Swal from "sweetalert2";

import NameDialog from "./components/nameDialog";
import Footer from "./components/footer";
import CircleHomeImage from "./components/circleHomeImage";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiMusic } from "react-icons/fi";

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
		text: "Cie yang nambah tuaa, hehe \nMoga panjang umur yaa, \nbiar bisa traktir atmin hehehe 👻 \n\nAda pesan dari atmin dibawah :D",
	},
	{
		textHead: "Tebak yang Mana Hadiahnya 👻👻 !!",
		text: "",
	},
];

const list_gambar = [
	"https://media.tenor.com/nzouT6uufQ0AAAAj/peach-goma.gif",
	"https://media.tenor.com/JFu3-alzcf0AAAAj/peach-goma.gif",
	"https://media1.tenor.com/m/nIDGGyhAm7EAAAAd/cake-birthday.gif",
	"https://media.tenor.com/h1G5b-B4lbcAAAAi/hu-tao.gif",
];

const list_kado = [
	"https://media1.tenor.com/m/NRPebgTbvnsAAAAd/sttt-diem-lu.gif",
	"https://media1.tenor.com/m/6UioMsc65cAAAAAC/smol-hu-tao.gif",
	"https://media1.tenor.com/m/IG4imXsWoFsAAAAd/hampter-wow.gif",
];

const randomGift = Math.floor(Math.random() * 2);

function App() {
	const [text, setText] = useState([]);
	const [userName, setUserName] = useState("");

	const [giftNumber, setGiftNumber] = useState(0);
	const [giftModal, setGiftModal] = useState(false);
	const [trueGift, setTrueGift] = useState(false);

	const [alertShown, setAlertShown] = useState(false);

	const [isNext, setIsNext] = useState(0);
	const [isImageNext, setIsImageNext] = useState(0);

	const [isNameEntered, setIsNameEntered] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [animatePrev, setAnimatePrev] = useState(false);

	const [waModal, setModalWa] = useState(false);
	const [pesanAtmin, setPesanAtmin] = useState(false);

	const typingSpeed = 100;
	const delayAfterTyping = 500;

	const controlsImage = useAnimation();

	const [clickCount, setClickCount] = useState(0);

	const audioRef = useRef(null);

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

	const handlePlayMusic = () => {
		if (audioRef.current) {
			audioRef.current.volume = 1;
			audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
		}

		createSnowfall();
		setAlertShown(false);

		createSnowfall();
		setIsNext(3);
		setIsImageNext(2);
	};

	// Handle cancel button
	const handleCancel = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}

		createSnowfall();
		setAlertShown(false);

		createSnowfall();
		setIsNext(3);
		setIsImageNext(2);
	};

	// Handle music ended
	const handleMusicEnded = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		}
	};

	const handleBalloonClick = (e) => {
		e.target.classList.add("popped");
		setClickCount((prevCount) => {
			const newCount = prevCount + 1;
			if (newCount === 3) {
				setTimeout(() => {
					setAlertShown(true);
				}, 500);
			}
			return newCount;
		});
	};

	const handleGiftClick = () => {
		if (trueGift) {
			setModalWa(true);
			setGiftModal(false);
		} else {
			setGiftModal(false);
		}
	};

	useEffect(() => {
		giftNumber === randomGift ? setTrueGift(true) : setTrueGift(false);
	}, [giftNumber]);

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

		setPesanAtmin(false);
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

	const atminHandling = () => {
		setModalWa(false);
		const message = encodeURIComponent("Minn aku dapet kadonyaa, mana hadiahnya :D ?");

		const whatsappUrl = `https://wa.me/62895800715580?text=${message}`;
		window.open(whatsappUrl, "_blank");

		setTimeout(() => {
			Swal.fire({
				title: "Pesan Terkirim!",
				text: "Tunggu balasan dari Atmin ya 😁",
				icon: "success",
				confirmButtonText: "OK",
			}).then((result) => {
				if (result.isConfirmed) {
					setIsNext(5);
				}
			});
		}, 1000);
	};

	return (
		<div
			className={`flex flex-col items-center ${
				isNext == 5 ? "justify-center " : "justify-start pt-20 "
			}h-screen w-full gap-5 relative overflow-hidden`}>
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
						{isNext < 5 && (
							<CircleHomeImage
								controlsImage={controlsImage}
								isNext={isImageNext}
								list_gambar={list_gambar}
							/>
						)}
						{/* END CIRCLE IMG */}

						{isNext < 4 && (
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
						)}

						{isNext === 4 && (
							<motion.h1
								className="font-bold text-lg text-white"
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
					</span>
				)}
				{/* END HEADER */}

				{/* BODY */}
				{animatePrev && isNext < 3 && (
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

				{isNext == 3 && (
					<>
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
										className="font-semibold text-lg"
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
										{list_text[isNext]?.textHead.toUpperCase()}
									</motion.h1>
								)}

								{text && text.length > 0 && (
									<p className="mt-5">
										{text}
										<span className="animate-blink">|</span>
									</p>
								)}
							</div>
						</motion.span>

						{showButton && (
							<div className="flex items-center justify-center z-10">
								<motion.button
									className="bg-black/50 px-5 py-2 rounded-md text-white"
									onClick={() => setPesanAtmin(true)}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									whileTap={{ scale: 0.5 }}
									transition={{
										duration: 0.4,
										scale: { type: "spring", stiffness: 100, damping: 10 },
									}}>
									<small className="font-semibold">💌 dari Atmin!</small>
								</motion.button>
							</div>
						)}
					</>
				)}

				{isNext == 4 && (
					<motion.div
						className={`bg-black/25 rounded-lg flex flex-col text-center gap-3 py-3 text-white z-10 px-10`}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.4,
							scale: { type: "spring", stiffness: 100, damping: 10 },
						}}>
						<motion.div
							className="flex justify-center gap-2 z-10"
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: { duration: 0.5 },
							}}>
							{[0, 1, 2].map((id) => (
								<motion.div
									key={id}
									className="balloon"
									onClick={(e) => {
										e.target.classList.add("popped");
										console.log(id);
										setGiftNumber(id);
										setGiftModal(true);
									}}
									initial={{ opacity: 0, scale: 0 }}
									animate={{
										opacity: 1,
										scale: 1,
										transition: {
											delay: id * 0.2,
											duration: 0.5,
											scale: { type: "spring", stiffness: 100, damping: 10 },
										},
									}}>
									🎁
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				)}

				{isNext == 5 && (
					<motion.div
						className={`bg-black/25 rounded-lg flex flex-col text-center py-3 text-white z-10 px-10 gap-10 mx-10`}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.4,
							scale: { type: "spring", stiffness: 100, damping: 10 },
						}}>
						<motion.div animate={{ scale: 1.1 }} className="mt-4 w-[90%]">
							<motion.img
								src={"https://media.tenor.com/g8LwF4tAoAYAAAAi/bye-sticker-goodbye-sticker.gif"}
								alt="kado"
								className="w-full h-full rounded-lg object-cover"
							/>
						</motion.div>

						<motion.h1
							className="text-center font-semibold "
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}>
							Terimakasih sudah mampir ke siniii
							<small>
								<br /> semoga harimu menyenangkan 🎉✨
							</small>
						</motion.h1>
					</motion.div>
				)}
				{/* END BODY */}

				{/* GIFT DIALOG */}
				<Dialog open={giftModal} onOpenChange={setGiftModal}>
					<DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col">
						<DialogHeader>
							<DialogTitle>
								<p>{trueGift ? "Yey Kamu Dapet Hadiah" : "Masi salahhh 👻👻"}</p>
							</DialogTitle>
						</DialogHeader>

						<motion.div animate={{ scale: 1.1 }} className="h-64 overflow-hidden mt-4 w-[90%]">
							<motion.img
								src={
									trueGift
										? "https://media1.tenor.com/m/NCVzx6DUmrIAAAAd/hutao-genshin-impact.gif"
										: list_kado[giftNumber]
								}
								alt="kado"
								className="w-full h-full rounded-lg object-cover"
							/>
						</motion.div>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className={`py-2 rounded-md ${
								trueGift ? "bg-green-500" : "bg-blue-950/80"
							} text-white w-full mt-2`}
							onClick={handleGiftClick}>
							<small>{trueGift ? "MINN BENAR" : "Coba Lagi !!"}</small>
						</motion.button>
					</DialogContent>
				</Dialog>
				{/* END GIFT DIALOG */}

				{/* DIALOG */}
				<NameDialog
					setUserName={setUserName}
					userName={userName}
					setIsNameEntered={setIsNameEntered}
				/>
				{/* DIALOG */}

				{/* MUSIK */}
				<audio ref={audioRef} onEnded={handleMusicEnded}>
					<source src="/blue.mp3" type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
				{/* END MUSIC */}

				{/* MUSIK MODAL */}
				<Dialog open={alertShown} onOpenChange={setAlertShown}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle className="flex flex-col items-center">
								<FiMusic size={60} className="text-blue-500" />
								<small className="mt-2">Musik yung kai - blue (Official Audio)</small>
							</DialogTitle>
						</DialogHeader>

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
				{/* END MUSIK MODAL */}

				{/* PESAN ATMIN */}
				<Dialog open={pesanAtmin} onOpenChange={setPesanAtmin}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>
								<small className="font-bold text-lg">Heyy!!</small> <br />
								<small className="font-bold text-lg">Happy B-dayy</small>
							</DialogTitle>
						</DialogHeader>

						<small className="text-center">
							Hari ini adalah hari spesialmu, Hari ini kamu ulang tahunnnnn.......
							<br />
							selamat bertambah usia, makin sabar, dan kuat, do'a terbaik untukmu.
							<br />
							Semoga diumur sekarang semesta lebih berpihak sama kamu, semoga bisa dapetin hal yang
							selama ini diperjuangin semoga bahagia, dan semoga itu selamanya..
							<br />
							<br />
							<span className="font-semibold font-lg">
								I'm glad that i met someone like you, and thanks for being a part of my life.
							</span>
						</small>

						<small className=" text-center">atmin ada sedikit hadian nii di next page :D</small>
						<div className="flex flex-col gap-1 items-center justify-center">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className={`border py-1 rounded-md bg-black/30 text-white hover:bg-white hover:text-black hover:border-black transition-colors w-full`}
								onClick={handleNext}>
								<small>Gasinn!!</small>
							</motion.button>
						</div>
					</DialogContent>
				</Dialog>
				{/* END PESAN ATMIN */}

				{/* WA MODAL */}
				<Dialog open={waModal} onOpenChange={setModalWa}>
					<DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col">
						<DialogHeader>
							<DialogTitle className="flex flex-col items-center">
								<small className="mt-2">Minta kadonya ke Atminn!!1</small>
							</DialogTitle>
						</DialogHeader>

						<motion.div animate={{ scale: 1.1 }} className="h-64 overflow-hidden mt-4 w-[90%]">
							<motion.img
								src={"https://media1.tenor.com/m/AB-g3b2TZ-4AAAAd/nelpon-atmin-nelpon-admin.gif"}
								alt="kado"
								className="w-full h-full rounded-lg object-cover"
							/>
						</motion.div>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="py-2 px-4 rounded-md bg-blue-950/80 text-white w-full"
							onClick={atminHandling}>
							<small>Atminnn!!! </small>
						</motion.button>
					</DialogContent>
				</Dialog>
				{/* END WA MODAL */}

				{/* FOOTER */}
				<Footer />
				{/* END FOOTER */}
			</>
		</div>
	);
}

export default App;
