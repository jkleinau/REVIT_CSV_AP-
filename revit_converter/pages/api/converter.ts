import nextConnect from 'next-connect';
import path from 'path';
import { spawn } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.post((req, res) => {
	const python_script = spawn('python3', [
		path.resolve('../main.py'),
		'./public/uploads/1649760017094.csv',
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
	});
});

export default apiRoute;
