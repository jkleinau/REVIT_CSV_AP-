import { NextPageContext } from 'next';
import fs from 'fs';
import Link from 'next/link';
type FileProps = {
	file: string | null;
};
const download = ({ file }: FileProps) => {
	return (
		<div className='w-full h-screen bg-green-500'>
			<h1 className='text-8xl text-center pt-20'>Erfolgreich Umgewandelt!</h1>

			<div className='flex justify-center mt-16'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'>Zum Start</a>
				</Link>
				{file ? (
					<a
						href={'/api/download?filename=' + file}
						className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'
					>
						Download
					</a>
				) : null}
			</div>
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const files = fs.readdirSync('public/downloads');
	return {
		props: { file: files[0] ? files[0] : null }, // will be passed to the page component as props
	};
}
export default download;
