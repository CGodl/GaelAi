import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLinkedin,
	faGithub,
	faAngellist,
} from '@fortawesome/free-brands-svg-icons';

const footerItems = [
	{
		icon: faLinkedin,
		link: 'https://www.linkedin.com/in/carlgodlewski/',
	},
	{
		icon: faGithub,
		link: 'https://github.com/CGodl',
	},
	{
		icon: faAngellist,
		link: 'https://wellfound.com/u/carl-godlewski',
	},
];

export const FooterLanding = () => {
	return (
		<footer className='bg-red-500 z-[10]'>
			<div>Made by Carl Godlewski</div>
			<div>Connect with me on:</div>
			<ul>
				{footerItems.map((linkItem) => {
					return (
						<li key={linkItem}>
							<Link href={linkItem.link}>
							<FontAwesomeIcon icon={linkItem.icon} />
							</Link>
						</li>
					);
				})}
			</ul>
		</footer>
	);
};
