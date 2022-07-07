import { Html, Head, Main, NextScript } from 'next/document';

// edit the DOM body to change background color
export default function Document() {
	return (
		<Html>
			<Head />
			<body className='bg-indigo-500 text-white'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
