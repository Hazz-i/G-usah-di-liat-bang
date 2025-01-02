import { motion } from "framer-motion";

const firstHeader = ({ userName }) => {
	return (
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
	);
};

export default FirstHeader;
