import { UiFileInputButton } from '../components/UIFileInputButton';
import axios from 'axios';
import { useRouter } from 'next/router';
const IndexPage = () => {
	const router = useRouter();
	const onChange = async (formData: any) => {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (event: any) => {
				console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
			},
		};

		const response = await axios.post('http://localhost:3000/api/uploads', formData, config);
		if (response.status === 200) {
			router.push('/convert');
		}
		console.log('response', response.data);
	};

	return (
		<div>
			<h1 className='text-8xl text-center p-8 mb-6 mt-28'>
				Bitte hier die CSV hochladen, die umgewandelt werden soll.
			</h1>
			<UiFileInputButton
				acceptedFileTypes='.csv'
				allowMultipleFiles={false}
				label='Datei Hochladen'
				uploadFileName='theFiles'
				onChange={onChange}
			/>
		</div>
	);
};
export default IndexPage;
