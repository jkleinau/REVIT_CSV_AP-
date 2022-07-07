import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';
// handle error and wrong requests
const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.redirect('/error?msg=' + error.message);
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.get((req, res) => {
	// read file from directory
	const file = fs.readFileSync('public/downloads/' + req.query.filename);
	// setting http headers for download
	res.setHeader('Content-Type', 'application/csv');
	res.setHeader('Content-Disposition', 'attachment; filename=Ap+Import.csv');
	// sending the file as raw data
	res.send(file);
	// delete file from download folder after download to prevent file pile up
	fs.unlinkSync('public/downloads/' + req.query.filename);
});

export default apiRoute;
