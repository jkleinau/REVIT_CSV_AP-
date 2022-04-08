import { GetServerSideProps } from 'next';
import { FC } from 'react';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
const Detail: FC = ({ data }) => {
	return (
		<div>
			<table>
				<tr>
					<th>APPLUS BEZEICHNUNG</th>
					<th>APPLUS ARTIKELNUMMER</th>
				</tr>
				{data.map((record) => {
					return (
						<tr key={record['APPLUS ARTIKELNUMMER']}>
							<th>{record['APPLUS BEZEICHNUNG']}</th>
							<th>{record['APPLUS ARTIKELNUMMER']}</th>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const filename = context.query.filename;
	const rawdata = fs.readFileSync('public/uploads/' + filename);
	const records = parse(rawdata, {
		columns: true,
		delimiter: ';',
	});

	return {
		props: { data: records },
	};
};
