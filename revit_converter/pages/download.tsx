import { NextPageContext } from 'next';
import fs from 'fs';
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
