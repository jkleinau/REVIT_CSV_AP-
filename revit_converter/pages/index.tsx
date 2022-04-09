import fs from 'fs';
import axios from 'axios';
import { NextPageContext } from 'next';
const IndexPage = ({ files }) => {
	return (
		<table className='table-fixed mx-auto'>
			<thead>
				<tr>
					<th>File Name</th>
					<th>created at</th>
				</tr>
			</thead>
			<tbody>
				{files.map((file: string) => {
					const split = file.split('-');
					const date = new Date(Number(split[1].split('.')[0]));
					return (
						<tr key={file}>
							<a href={'/detail?filename=' + file}>
								<td>{split[0]}</td>
								<td>{date.toLocaleString()}</td>
							</a>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
export async function getServerSideProps(context: NextPageContext) {
	const files = fs.readdirSync('public/uploads');
	return {
		props: { files }, // will be passed to the page component as props
	};
}
export default IndexPage;
