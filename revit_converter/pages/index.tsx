import fs from 'fs';
import axios from 'axios';
import { NextPageContext } from 'next';
const IndexPage = ({ files }) => {
	return (
		<ul className='list-none'>
			{files.map((file: string) => {
				return <li key={file}> {file.split('.')[0]}</li>;
			})}
		</ul>
	);
};
export async function getServerSideProps(context: NextPageContext) {
	const files = fs.readdirSync('public/uploads');
	return {
		props: { files }, // will be passed to the page component as props
	};
}
export default IndexPage;
