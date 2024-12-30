const Footer = () => {
	return (
		<footer className="absolute bottom-1 w-full text-center text-white z-10">
			<p className="text-sm font-thin">
				&copy; {new Date().getFullYear()} Created by{" "}
				<a
					href="https://i.pinimg.com/736x/64/63/55/6463553cc2154f1799a55c29285e6be3.jpg"
					className="text-blue-400">
					aku
				</a>
			</p>
		</footer>
	);
};

export default Footer;
