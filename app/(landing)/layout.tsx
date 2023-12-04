import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const LandingLayout =  ({ children }: { children: React.ReactNode }) => {
	return (
        <main className='h-full bg-[linear-gradient(111.4deg,_rgba(7,7,9,1)_6.5%,_rgb(21,9,63)_93.2%)]'>
            <div className='mx-auto max-w-screen-xl h-full w-full'>
                {children}
            </div>
        </main>
    )
};

export default LandingLayout;


//background-image: linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% );