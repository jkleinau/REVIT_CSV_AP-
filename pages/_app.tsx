import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Base Component that renders all everything else
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* <Nav /> */}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
