'use client'

import { HeroLanding } from "@/components/HeroLanding";
import { NavbarLanding } from "@/components/NavbarLanding";
import { ParticleConstellation } from "@/components/ParticleConstellation";

export default function LandingPage() {
	return (
		<div className="h-full">
			<ParticleConstellation />
			<NavbarLanding />
			<HeroLanding />

		</div>
		
	);
}
