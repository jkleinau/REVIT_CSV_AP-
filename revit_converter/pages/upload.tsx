import { UiFileInputButton } from '../components/UIFileInputButton';
import axios from 'axios';
const IndexPage = (props) => {
	const onChange = async (formData) => {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (event) => {
				console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
			},
		};

		const response = await axios.post('/api/uploads', formData, config);

		console.log('response', response.data);
	};

	return (
		<div>
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
