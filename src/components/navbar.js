'use client';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';

const navigation = [
	{ name: 'Auth Board', href: '/', current: true },
	{
		name: 'Home',
		href: 'https://lethargic-sol.netlify.app/',
		current: false,
	},
	{
		name: 'About',
		href: 'https://lethargic-sol.netlify.app/#about',
		current: false,
	},
	{
		name: 'Work',
		href: 'https://lethargic-sol.netlify.app/#work',
		current: false,
	},
	{
		name: 'Skills',
		href: 'https://lethargic-sol.netlify.app/#skills',
		current: false,
	},
	{
		name: 'Contact',
		href: 'https://lethargic-sol.netlify.app/#contact',
		current: false,
	},
];
function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const [userData, setUserData] = useState(null);

	const githubApiUrl = 'https://api.github.com/users/alpha-alexxx';

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(githubApiUrl);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				setUserData(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex font-bold space-x-1 flex-shrink-0 items-center">
									<Link
										href={
											'https://lethargic-sol.netlify.app/'
										}
										className="flex font-bold space-x-1 flex-shrink-0 items-center"
									>
										<img
											className="h-8 w-auto"
											src="https://freesvg.org/img/1534129544.png"
											alt="Google Logo"
										/>{' '}
										<span className="text-xl">Auth</span>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={
													item.current
														? 'page'
														: undefined
												}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
								<button className="hidden sm:flex absolute right-0 bg-gray-800  text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white active:scale-95">
									{userData ? (
										<Link href={userData.html_url}>
											<img
												className="h-10 w-10 rounded-full"
												src={userData.avatar_url}
												alt={userData.login}
											/>
										</Link>
									) : (
										<FaUser className="w-10 h-10" />
									)}
								</button>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white border-2 border-gray-300 ">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">
										Open main menu
									</span>
									{open ? (
										<FaTimes
											className="block h-6 w-6 text-white transition ease-in-out delay-150"
											aria-hidden="true"
										/>
									) : (
										<FaBars
											className="block h-6 w-6 text-white transition ease-in-out delay-150"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={
										item.current ? 'Dashboard' : undefined
									}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
