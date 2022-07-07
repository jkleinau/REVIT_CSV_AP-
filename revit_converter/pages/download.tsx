import { NextPageContext } from 'next';
import fs from 'fs';
import Link from 'next/link';
import { useState } from 'react';
import router from 'next/router';

const Download = () => {
	const filename = sessionStorage.getItem('filename');
	if (filename == null || filename == undefined || filename == '') {
		const msg = 'filename could not be found in session Storage';
		router.push('/error?msg=' + msg);
	}
	return (
		<div className='w-full h-screen bg-green-500'>
			<h1 className='text-8xl text-center pt-20'>Erfolgreich Umgewandelt!</h1>

			<div className='flex justify-center mt-16'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'>Zum Start</a>
				</Link>
				<a
					href={'/api/download?filename=' + filename}
					className='px-4 py-2 rounded border-2 mx-4 hover:bg-white hover:text-green-500'
					onClick={() => {
						document.body.getElementsByTagName('a')[1].setAttribute('style', 'display: none;');
					}}
				>
					Download
				</a>
			</div>
		</div>
	);
};

export default Download;
