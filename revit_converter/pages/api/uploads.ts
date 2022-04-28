import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const upload = multer({
	storage: multer.diskStorage({
		destination: './public/uploads',
		filename: function (req, file, cb) {
			const suffix = Date.now();
			cb(null, suffix + '.csv');
		},
	}),
});

const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.redirect('/error?msg=' + error.message);
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(upload.single('theFiles'));

apiRoute.post((req, res) => {
	// console.log('upload request incoming');
	res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};
