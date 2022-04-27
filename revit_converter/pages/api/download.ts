import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
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

apiRoute.get((req, res) => {
	const file = fs.readFileSync('public/downloads/' + req.query.filename);
	res.setHeader('Content-Type', 'application/csv');
	res.setHeader('Content-Disposition', 'attachment; filename=Ap+Import.csv');
	res.send(file);
	fs.unlinkSync('public/downloads/' + req.query.filename);
});

export default apiRoute;
