import { NextPageContext } from 'next';
import fs from 'fs';
import Link from 'next/link';
const download = ({ files }) => {
	return (
		<div className='w-full h-screen bg-green-500'>
			<h1 className='text-8xl text-center pt-20'>Erfolgreich Umgewandelt!</h1>
			<ul className='text-center mt-20'>
				{files.map((file: string) => {
					const date = new Date(Number(file.split('.')[0]));
					return (
						<li key={file} className='text-2xl'>
							<a href={'/api/download?filename=' + file}>{date.toLocaleString()}</a>
						</li>
					);
				})}
			</ul>
			<div className='flex justify-center mt-16'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'>Zum Start</a>
				</Link>
			</div>
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const files = fs.readdirSync('public/downloads');
	return {
		props: { files }, // will be passed to the page component as props
	};
}
export default download;
