import Link from 'next/link';
import router from 'next/router';

const Download = () => {
	// get filename from session storage for file identification
	const filename = sessionStorage.getItem('filename');
	// handle error if filename is not in session storage
	if (filename == null || filename == undefined || filename == '') {
		const msg = 'filename could not be found in session Storage';
		router.push('/error?msg=' + msg);
	}
	// render download page
	return (
		<div className='w-full h-screen bg-green-500'>
			<h1 className='text-8xl text-center pt-20'>Erfolgreich Umgewandelt!</h1>

			<div className='flex justify-center mt-16'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'>Zum Start</a>
				</Link>
				{/* Download button for file download makes request from download api endpoint with filename as query parameter */}
				<a
					href={'/api/download?filename=' + filename}
					className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'
					onClick={() => {
						// Make download button disappear after click
						document.body.getElementsByTagName('a')[1].setAttribute('style', 'display: none;');
					}}
				>
					Download
				</a>
			</div>
		</div>
	);
};

export default Download;
