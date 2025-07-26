"use client"
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <nav className="max-w-[1081px] px-2 w-full flex justify-between items-center mx-auto mt-[31px]">
        <Image
          src="/assets/hash.png"
          alt="hash"
          width={70}
          height={70}
          className="w-[70px] h-[70px]"
        />
        <Link href="/user" className="bg-[#001526] text-white py-3 px-[30px] rounded-[5px] md:flex hidden items-center justify-center text-[16px] font-medium tracking-[-0.64px] w-fit">Start Ranking</Link>
        <Link href="/team" className="text-[16px] font-medium tracking-[-0.64px] flex items-center text-[#001526]">Meet the team <ArrowRight width={20} /></Link>
      </nav>

      <div className="flex flex-col px-2 gap-[30px] mx-auto max-w-[1220px] items-center w-full">
        <h1 className="md:text-[120px] text-[50px] font-medium md:tracking-[-4.8px] tracking-[-2px] text-black text-center"><span className="text-[#737373]">Wanna</span> get <span className="instrument-serif italic">Ranked</span><span className="text-[#737373]">?</span></h1>
        <p className="md:text-[30px] text-center text-[20px] font-normal text-[#0a0a0a] md:tracking-[-1.2px] tracking-[-0.8px] instrument-sans">Rankr lets you create and vote on fun rankings about anything. From “Who has more aura” to “Main Character of the Week” — add names (and pics), and let people vote., the crowd decides who’s on top.</p>
        <Link href="/user" className="bg-[#001526] z-[9999] text-white py-3 px-[30px] rounded-[5px] flex items-center justify-center text-[16px] font-medium tracking-[-0.64px] w-fit">Start Ranking</Link>

      </div>

      <div className="w-full overflow-hidden -mt-16">
        <Image
          src="/assets/footer.png"
          alt="footer decoration"
          width={1900}
          height={379}
          className="w-full h-auto md:flex hidden max-w-[1900px] mx-auto object-contain md:object-cover"
          priority
        />
        <Image
          src="/assets/mobilefooter.png"
          alt="footer decoration"
          width={436}
          height={226}
          className="w-full md:hidden flex h-auto mx-auto object-contain md:object-cover"
          priority
        />
      </div>
    </div>
  );
}
