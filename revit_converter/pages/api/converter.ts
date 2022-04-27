import nextConnect from 'next-connect';
import path from 'path';
import { spawn } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.redirect('/error');
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.post((req, res) => {
	const files = fs.readdirSync('public/uploads/');
	const python_script = spawn('python3', [
		path.resolve('python/main.py'),
		'./public/uploads/' + files[files.length - 1],
		req.body.proj_titel,
	]);
	python_script.stdout.on('data', (data) => {
		console.log(data.toString());
	});
	python_script.on('error', (err) => {
		console.log(err.message);
	});
	python_script.on('close', (code) => {
		console.log('pyhton script finished');
		res.status(200).json({ data: 'success' });
		fs.unlinkSync('./public/uploads/' + files[files.length - 1]);
	});
});

export default apiRoute;
