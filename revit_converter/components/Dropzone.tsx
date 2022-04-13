import axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';

function MyDropzone() {
	const router = useRouter();
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			// Do something with the files
			const config = {
				headers: { 'content-type': 'application/csv' },
			};
			console.log(acceptedFiles[0]);
			const response = await axios.post('/api/simple', acceptedFiles[0], config);
			if (response.status === 200) {
				router.push('/convert');
			}
		},
		[router]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className='flex justify-center'>
			<div {...getRootProps()} className='border-dashed border-2 px-8 py-4 text-xl rounded-md'>
				<input {...getInputProps()} />
				{isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some files here, or click to select files</p>}
			</div>
		</div>
	);
}
export default MyDropzone;
