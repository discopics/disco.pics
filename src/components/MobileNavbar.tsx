import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useSession } from 'next-auth/react';
import React from 'react'

const FastFadeContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0,
			staggerChildren: 0.15,
		},
	},
}

const FadeSideways: Variants = {
	hidden: { x: -40, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
	},
}

const MobileNavContext = React.createContext({
	isOpen: false,
	toggle: () => { null; }
});

export const MobilNavProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {

	const [isOpen, setIsOpen] = React.useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<MobileNavContext.Provider value={{ isOpen, toggle }}>
			{children}
		</MobileNavContext.Provider>
	)
}

export const useMobileNav = () => React.useContext(MobileNavContext);

const MobileNavbar = () => {

	const { data: session } = useSession();
	const { isOpen, toggle } = useMobileNav();

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={FastFadeContainer}
					initial="hidden"
					animate="visible"
					exit="hidden"
					className='z-[200] fixed flex justify-between p-5 flex-col w-screen h-screen bg-dark'
				>

					<div className="relative">
						<button onClick={toggle} className='flex p-1 bg-rose-400/20 rounded-md justify-center items-center absolute top-2 left-2'>
							<svg className='w-6 h-6 text-rose-500' viewBox="0 0 24 24">
								<path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
							</svg>
						</button>
					</div>

					<motion.div
						className="flex flex-col ml-2 gap-8 items-start"
					>
						<motion.button
							className='text-white text-xl'
							variants={FadeSideways}
						>
							Home
						</motion.button>
						<motion.button
							className='text-white text-xl'
							variants={FadeSideways}
						>
							Embed Builder
						</motion.button>
						<motion.button
							className='text-white text-xl'
							variants={FadeSideways}
						>
							Custom CSS
						</motion.button>
					</motion.div>

					<motion.div transition={{ delay: 0.5 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-3 justify-center items-center w-fit rounded-md px-4 py-3 bg-rose-400/10">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={session?.user?.image ?? ""}
							className="rounded-full w-12 h-12"
							alt="avatar"
						/>
						<div className="flex w-fit flex-col justify-center items-center gap-0">
							{" "}
							<h1 className="text-rose-200 inline text-xl">{session?.user.name}</h1>
							<h1 className="text-md -ml-1 -mt-1 inline text-rose-100">
								#{session?.user.discriminator}
							</h1>
						</div>
						<button className="ml-auto inline-flex justify-center items-center text-rose-500 hover:bg-rose-400/50 hover:text-rose-300 px-2 rounded-md">
							<svg className="w-7 h-7" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z"></path></svg>
						</button>
					</motion.div>

				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default MobileNavbar;