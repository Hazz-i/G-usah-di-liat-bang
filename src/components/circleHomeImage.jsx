import { motion } from "framer-motion";

const CircleHomeImage = ({ controlsImage, isNext, list_gambar }) => {
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

	const handleClick = () => {
		if (isNext >= 2) {
			createSnowfall();
		}
	};

	return (
		<motion.div
			className="h-28 w-28 rounded-full border overflow-hidden flex items-center justify-center bg-gray-400/30"
			initial={{ opacity: 0, scale: 0 }}
			animate={controlsImage}>
			<motion.span
				className="h-24 w-24 rounded-full overflow-hidden"
				whileTap={{ scale: 0.8 }}
				onClick={handleClick}>
				<img
					src={list_gambar[isNext]}
					alt="Gambar animasi"
					className="w-full h-full object-cover"
				/>
			</motion.span>
		</motion.div>
	);
};

export default CircleHomeImage;
