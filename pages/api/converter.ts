import nextConnect from 'next-connect';
import path from 'path';
import { spawn } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
// Error handling and no false requests
const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.redirect('/error?msg=' + error.message);
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});
// conversion post route
apiRoute.post((req, res) => {
	// get filename from req for identification of the file
	const filename = req.body.filename;
	// start python script with two arguments: filename, project titel
	const python_script = spawn('python3', [
		path.resolve('python/main.py'),
		'./public/uploads/' + filename,
		req.body.proj_titel,
	]);
	// handle stdout ouput
	python_script.stdout.on('data', (data) => {
		console.log(data.toString());
	});
	// log errors from script
	python_script.on('error', (err) => {
		res.status(500).json({ msg: err.message });
		console.log(err.message);
	});
	// script successful conversion answer request
	python_script.on('close', (code) => {
		// console.log('pyhton script finished');
		res.status(200).json({ data: 'success' });
		// delete source file from uploads directory to prevent file pile up
		fs.unlinkSync('./public/uploads/' + filename);
	});
});

export default apiRoute;
