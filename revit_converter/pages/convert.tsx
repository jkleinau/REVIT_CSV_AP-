import { FC } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Detail: FC = () => {
	const [proj_titel, setproj_titel] = useState('');
	const router = useRouter();
	const onClick = async (event) => {
		event.preventDefault();
		const response = await axios.post('/api/converter', { proj_titel: proj_titel });
		if (response.status === 200) {
			// router.push('/download');
		}
	};
	return (
		<div>
			<h1 className='text-8xl text-center my-20'>Trage hier den Titel des Projektes.</h1>
			<input
				type='text'
				onChange={(e) => setproj_titel(e.target.value)}
				className='rounded text-indigo-500'
				name='project_titel'
				placeholder='Projekt Titel'
			/>
			<button onClick={onClick} className='px-4 py-2 rounded border-2 m-4 hover:bg-white hover:text-indigo-600'>
				Weiter
			</button>
		</div>
	);
};

export default Detail;