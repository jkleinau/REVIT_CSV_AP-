import Link from 'next/link';

// Start page without any logic just a link to the upload page
const IndexPage = () => {
	return (
		<div>
			<h1 className='text-8xl text-center py-20'>Revit zu Ap+ Converter</h1>
			<div className='flex justify-center'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded text-center border-2 mx-auto text-2xl hover:bg-white hover:text-indigo-600'>
						Start
					</a>
				</Link>
			</div>
		</div>
	);
};

export default IndexPage;
