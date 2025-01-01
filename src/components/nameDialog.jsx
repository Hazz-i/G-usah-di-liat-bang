import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

const NameDialog = ({ setUserName, userName, setIsNameEntered }) => {
	const [dialogOpen, setDialogOpen] = useState(true);
	const [error, setError] = useState("");

	// Dialog close
	const handleDialogClose = () => {
		if (!userName.trim()) {
			setError("gagall");
			return;
		}

		setIsNameEntered(true);
		setDialogOpen(false);
		setError("");
	};

	return (
		<Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						<small>Masukin Nama Kamu</small>
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-1 items-center justify-center">
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<Input
						id="name"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="col-span-3"
						placeholder="nama kamu"
						required
					/>
					<motion.button
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.8 }}
						className={`border py-1 rounded-md bg-black/30 text-white hover:bg-white hover:text-black hover:border-black transition-colors w-full ${
							userName !== "" ? "bg-blue-950/80" : ""
						}`}
						onClick={handleDialogClose}>
						<small>Sudah Min !!</small>
					</motion.button>
					{error && (
						<motion.div animate={{ scale: 1.1 }} className="h-44 overflow-hidden rounded-xl mt-4">
							<motion.img
								src="https://media.tenor.com/RcqfIAjFt5wAAAAM/spongebob-squarepants-patrick-star.gif"
								alt="error"
								className="w-full h-full object-cover"
							/>
						</motion.div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NameDialog;
