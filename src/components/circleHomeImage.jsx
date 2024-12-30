import { motion, useAnimation } from "framer-motion";

const CircleHomeImage = ({ controlsImage, isNext, list_gambar }) => {
	return (
		<motion.div
			className="h-28 w-28 rounded-full border overflow-hidden flex items-center justify-center bg-gray-400/30"
			initial={{ opacity: 0, scale: 0 }}
			animate={controlsImage}>
			<motion.span className="h-24 w-24 rounded-full overflow-hidden" whileTap={{ scale: 0.8 }}>
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
