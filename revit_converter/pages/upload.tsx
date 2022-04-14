import { UiFileInputButton } from '../components/UIFileInputButton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MyDropzone from '../components/Dropzone';
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
