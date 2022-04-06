import Link from 'next/link';
import { FC } from 'react';

const Nav: FC = () => {
	return (
		<nav className='flex bg-stone-800 w-full text-white'>
			<Link href='/'>
				<a className='mx-10'>Home</a>
			</Link>
			<Link href='/upload'>
				<a className='mx-10'>Upload</a>
			</Link>
		</nav>
	);
};

export default Nav;
