import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

import SidebarMobile from '@/components/SidebarMobile';
import { getApiLimitCount } from '@/lib/api-limit';

const Navbar = async () => {
	const apiLimitCount = await getApiLimitCount();

	return (
		<div className='flex items-center p-4'>
            <SidebarMobile apiLimitCount={apiLimitCount}/>
			
			<div className='flex w-full justify-end'>
				<UserButton afterSignOutUrl='/' />
			</div>
		</div>
	);
};

export default Navbar;
