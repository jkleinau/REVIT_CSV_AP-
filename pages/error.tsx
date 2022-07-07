import Link from 'next/link';
import { useRouter } from 'next/router';
// Error page to show user that something went wrong
const Error = () => {
	const router = useRouter();
	// error msg in query string
	const msg = router.query.msg;
	// error rendering
	return (
		<div className='bg-red-600 h-screen'>
			<h1 className='text-8xl text-center pt-20'>Irgendetwas ist schiefgelaufen</h1>
			<p className='text-center text-4xl pt-10'>{msg}</p>
			{/*  Navigation back to upload */}
			<div className='flex justify-center pt-10'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-red-600'>Zum Start</a>
				</Link>
			</div>
		</div>
	);
};

export default Error;
