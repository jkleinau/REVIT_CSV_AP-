import axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';

// Dropzone component configuration
function MyDropzone() {
	const router = useRouter(); // Nextjs router
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			// Header configuration
			const config = {
				headers: { 'content-type': 'application/csv' },
			};
			// console.log(acceptedFiles[0]);

			// send post request with the file to API endpoint simple
			const response = await axios.post('/api/simple', acceptedFiles[0], config);
			if (response.status === 200) {
				// save the filename in the session storage for late identification
				sessionStorage.setItem('filename', response.data.filename);
				// user navigation
				router.push('/convert');
			} else {
				router.push('/error');
			}
		},
		[router]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		// render Dropzone component
		<div className='flex justify-center'>
			<div {...getRootProps()} className='border-dashed border-2 px-8 py-4 text-xl rounded-md'>
				<input {...getInputProps()} />
				{isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some files here, or click to select files</p>}
			</div>
		</div>
	);
}
export default MyDropzone;
