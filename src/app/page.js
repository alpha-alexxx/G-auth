import navbar from '@/components/navbar.js';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar.js';
import CopyCard from '@/components/copy-card';
import Notification from '@/components/notification';

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="w-full h-[90vh] flex items-center justify-center">
				<CopyCard />
			</main>
		</>
	);
}
