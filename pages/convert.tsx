import { FC } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Converter component
const Detail: FC = () => {
	// project titel from user input
	const [proj_titel, setproj_titel] = useState('');
	const router = useRouter();
	// get the filename from session storage for identification
	const filename = sessionStorage.getItem('filename');
	// check if the filename could be found
	if (filename == null || filename == undefined || filename == '') {
		const msg = 'filename could not be found in session Storage';
		router.push('/error?msg=' + msg);
	}
	// onclick function from convert button
	const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		// make post request to converter endpoint to start the python script with project titel as argument
		const response = await axios.post('/api/converter', { proj_titel: proj_titel, filename: filename });
		// wait for answer
		if (response.status === 200) {
			// if conversion successful navigate user to download page
			router.push('/download');
		} else {
			// handling error during conversion navigate user to error page
			const msg =
				'Die Datei konnte nicht umgewandelt werden error code: ' +
				response.status +
				' mit der msg: ' +
				response.statusText;
			router.push('/error?msg=' + msg);
		}
	};
	// render conversion page
	return (
		<div>
			<h1 className='text-8xl text-center my-20'>Trage hier den Titel des Projektes.</h1>
			<div className='flex justify-center text-2xl'>
				{/* Input field for project titel */}
				<input
					type='text'
					onChange={(e) => setproj_titel(e.target.value)}
					className='rounded text-indigo-500 '
					name='project_titel'
					placeholder='Projekt Titel'
				/>
				<button onClick={onClick} className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-indigo-600'>
					Weiter
				</button>
			</div>
		</div>
	);
};

export default Detail;
