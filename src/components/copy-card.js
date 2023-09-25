'use client';
import { FaClipboardList, FaSpinner } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import { useState, useEffect } from 'react';
import Notification from './notification';

export default function CopyCard() {
	const [authCode, setAuthCode] = useState('');
	const [btnBasedOnAuthCode, setBtnBasedOnAuthCode] = useState(null);
	const [isCopying, setIsCopying] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationData, setNotificationData] = useState({});

	useEffect(() => {
		const getUrlParameter = (name) => {
			const url = new URL(window.location.href);
			return url.searchParams.get(name);
		};

		const codeParam = getUrlParameter('code');

		if (codeParam) {
			setAuthCode(codeParam);
		} else {
			// If there is no code in the URL, display a placeholder message
			setAuthCode('There is no code to copy!');
		}
	}, []);
	const copyToClipboard = async () => {
		try {
			if (authCode !== 'There is no code to copy!') {
				setIsCopying(true);
				setBtnBasedOnAuthCode(true);
				await navigator.clipboard.writeText(`/auth ${authCode}`);
				setNotificationData({
					title: 'Code Copied Successfully',
					message:
						'You can now paste the code into the Telegram Bot.',
					status: 'success',
				});
			} else {
				setIsCopying(false);
				setBtnBasedOnAuthCode(false);
				setShowNotification(true);
				setNotificationData({
					title: 'Copying Failed',
					message: 'The code could not be copied. Please try again.',
					status: 'warning',
				});
			}
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
			setNotificationData({
				title: 'Copying Failed!',
				message: 'There is an error in copying code',
				status: 'warning',
			});
		}

		setTimeout(() => {
			setShowNotification(true);
			setBtnBasedOnAuthCode(null);
			setIsCopying(false);
			setTimeout(() => {
				setShowNotification(false);
				setTimeout(() => {
					notificationData.status === 'success'
						? window.close()
						: null;
				}, 2000);
			}, 2000);
		}, 1500);
	};

	return (
		<>
			<div className="bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-500 w-4/5">
				<div className="px-4 py-5 sm:px-6 text-center font-semibold text-xl relative">
					<span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 relative inline-block">
						<span className="relative text-white">
							Google Authentication Code
						</span>
					</span>
				</div>
				<div className="px-4 py-5 sm:p-6">
					<div>
						<div className="mt-1">
							<textarea
								rows={4}
								name="auth_code"
								id="auth_code"
								className="bg-gray-900 shadow-sm focus:ring-gray-700 focus:border-indigo-500 block w-full border-gray-300 outline-none focus:ring-4 rounded-md resize-none text-[24px] font-semibold p-4 text-lg"
								defaultValue={
									authCode !== 'There is no code to copy!'
										? authCode
										: ''
								}
								readOnly
								placeholder={authCode}
							/>
						</div>
					</div>
				</div>
				<div className="px-4 py-4 sm:px-6 justify-center flex sm:justify-end">
					<button
						type="button"
						className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
							isCopying && btnBasedOnAuthCode
								? 'bg-green-500 animate-pulse'
								: btnBasedOnAuthCode === false
								? 'bg-red-600 animate-shake'
								: btnBasedOnAuthCode == null
								? 'bg-indigo-600 hover:bg-indigo-700'
								: ''
						} focus:outline-none active:scale-95 transition ease-in-out duration-300 capitalize`}
						onClick={copyToClipboard}
						disabled={isCopying}
					>
						{isCopying && btnBasedOnAuthCode ? (
							<ImSpinner9 className="animate-spin w-5 h-5 mx-2" />
						) : (
							<FaClipboardList className="w-5 h-5 mx-2" />
						)}
						{isCopying && btnBasedOnAuthCode
							? 'Processing...'
							: btnBasedOnAuthCode === false
							? 'No Code to Copy'
							: btnBasedOnAuthCode == null
							? 'Copy Auth Code'
							: ''}
					</button>
				</div>
			</div>

			<Notification
				onClose={() => setShowNotification(false)}
				message={notificationData.message}
				title={notificationData.title}
				status={notificationData.status}
				show={showNotification}
			/>
		</>
	);
}
