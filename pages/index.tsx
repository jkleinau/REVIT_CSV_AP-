import Link from 'next/link';
const IndexPage = () => {
	return (
		<div>
			<h1 className='text-8xl text-center py-20'>Revit zu Ap+ Converter</h1>
			<div className='flex justify-center'>
				<Link href='/upload'>
					<a className='px-4 py-2 rounded text-center border-2 mx-auto text-2xl hover:bg-white hover:text-indigo-600'>
						Start
					</a>
				</Link>
			</div>
		</div>
	);
};
// export async function getServerSideProps(context: NextPageContext) {
// 	const files = fs.readdirSync('public/uploads');
// 	return {
// 		props: { files }, // will be passed to the page component as props
// 	};
// }
export default IndexPage;
