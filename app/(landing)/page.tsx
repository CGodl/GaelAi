'use client';

import { HeroLanding } from '@/components/HeroLanding';
import { NavbarLanding } from '@/components/NavbarLanding';
import { ParticleConstellation } from '@/components/ParticleConstellation';
import { FooterLanding } from '@/components/FooterLanding';

export default function LandingPage() {
	return (
		<>
			<div className='h-5/6'>
				<NavbarLanding />
				<HeroLanding />
				<ParticleConstellation />
			</div>
			<FooterLanding/>
		</>
	);
}
