import logo from '@/assets/images/logo13.png';
import { Background } from '@/components/global';
import { HeroSection } from '@/components/module/home';
import { ThemeButton } from '@/components/ui/theme-button';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Background />
      <div className="flex min-h-screen flex-col items-center justify-between px-5 inset-0 relative">
        <Image
          src={logo}
          alt="PUPQC RIS"
          quality={100}
          height={200}
          width={150}
          className="mt-10"
        />

        <HeroSection />

        {/* <ThemeButton className="h-10 w-10 rounded-full z-50 absolute bottom-2 right-6" /> */}

        <footer className="flex-0 flex w-full items-center justify-center py-3">
          <div className="text-xs">
            <span>PUPQC RIS © 2023</span>
          </div>
        </footer>
      </div>
    </>
  );
}
