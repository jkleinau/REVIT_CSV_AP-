import { UiFileInputButton } from '../components/UIFileInputButton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MyDropzone from '../components/Dropzone';
const IndexPage = () => {
	const [errors, seterrors] = useState<string[]>([]);
	const router = useRouter();
	const onChange = async (formData: any) => {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (event: any) => {
				console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
			},
		};

		const response = await axios.post('/api/uploads', formData, config);
		console.log(response.request);
		if (response.status === 200) {
			router.push('/convert');
		} else {
			const err = 'Error bad response. Code: ' + response.status + ' with Text ' + response.statusText;
			console.log(err);
			seterrors([...errors, err]);
		}
		console.log('response', response.data);
		// console.log();
	};

	return (
		<div>
			<h1 className='text-8xl text-center p-8 mb-6 mt-28'>
				Bitte hier die CSV hochladen, die umgewandelt werden soll.
			</h1>
			{errors.map((err) => {
				return (
					<div key={err} className='w-3/5 bg-red-600/80 mx-auto px-5 rounded-md'>
						<p>{err}</p>{' '}
					</div>
				);
			})}
			<MyDropzone />
			{/* <UiFileInputButton
				acceptedFileTypes='.csv'
				allowMultipleFiles={false}
				label='Datei Hochladen'
				uploadFileName='theFiles'
				onChange={onChange}
			/> */}
		</div>
	);
};
export default IndexPage;
