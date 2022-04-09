import { GetServerSideProps } from 'next';
import { FC } from 'react';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
const Detail: FC = ({ data }) => {
	// const keys = Object.keys(data[0]);
	const keys = ['APPLUS EBENE', 'APPLUS BEZEICHNUNG', 'APPLUS ARTIKELNUMMER', 'APPLUS MENGE'];
	return (
		<div>
			<table className='table-fixed mx-auto'>
				<thead>
					<tr>
						{keys.map((key) => {
							return <th key={key}>{key}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{data.map((record) => {
						return (
							<tr key={record['APPLUS ARTIKELNUMMER']}>
								{keys.map((key) => {
									return <td key={key}>{record[key]}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
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
