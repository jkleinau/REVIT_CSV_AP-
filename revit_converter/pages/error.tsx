import Link from 'next/link';

type err = {
	msg: string;
};
const error = ({ msg }: err) => {
	return (
		<div className='bg-red-600 h-screen'>
			<h1 className='text-8xl text-center pt-20'>Irgendetwas ist schiefgelaufen</h1>
			<p className='text-center text-4xl'>{msg}</p>
			<div className='flex justify-center pt-10'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-red-600'>Zum Start</a>
				</Link>
			</div>
		</div>
	);
};

export default error;
