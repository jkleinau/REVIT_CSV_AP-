import MyDropzone from '../components/Dropzone';

// Upload page that utilizes Dropzone for file upload with drag-n-drop functionality
// for more information about dropzone see doc:https://docs.dropzone.dev
const IndexPage = () => {
	return (
		<div>
			<h1 className='text-8xl text-center p-8 mb-6 mt-28'>
				Bitte hier die CSV hochladen, die umgewandelt werden soll.
			</h1>
			<MyDropzone />
		</div>
	);
};
export default IndexPage;
