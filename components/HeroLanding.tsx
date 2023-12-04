'use client';

import { useAuth } from '@clerk/nextjs';
import TypewriterComponent from 'typewriter-effect';


export const HeroLanding = () => {
	const { isSignedIn } = useAuth();

	return (
		<>

			<div className='text-white font-bold py-36 text-center space-y-5 z-[10]'>
				<div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold '>
					<h1>The AI tool for generating</h1>
                    <div className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-500'>
                        <TypewriterComponent 
                            options={{
                                strings: [
                                    "Code",
                                    "Conversations",
                                    "Music",
                                    "Videos"
                                ],
                                autoStart: true,
                                loop: true
                            }}
                            
                        
                        />

                    </div>
				</div>
			</div>
		</>
	);
};
