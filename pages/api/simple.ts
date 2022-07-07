import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';

const apiRoute = nextConnect({
	// handle error while upload and redirect
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.redirect('/error?msg=' + error.message);
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

// Simple upload route that saves the file in uploads folder
apiRoute.post((req, res) => {
	// make filename current Date int
	const filename = Date.now() + '.csv';
	// write file to directory
	fs.writeFileSync('./public/uploads/' + filename, req.body);
	// reply with ok status code
	res.status(200).json({ data: 'success', filename: filename });
});

export default apiRoute;
