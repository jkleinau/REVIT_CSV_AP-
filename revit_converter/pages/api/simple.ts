import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';
const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.redirect('/error?msg=' + error.message);
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});
apiRoute.post((req, res) => {
	const filename = Date.now() + '.csv';
	fs.writeFileSync('./public/uploads/' + filename, req.body);
	res.status(200).json({ data: 'success' });
});

export default apiRoute;
