"use client"; 

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // 👈 استيراد usePathname

interface SidebarItemProps {
  name: string;
  image: string;
  href: string; 
}

export default function SidebarItem({ name, image, href }: SidebarItemProps) {
  const currentPath = usePathname(); 
  const isActive = currentPath === href; 

  return (
    <li className='mt-4'>
      <Link
        href={href}
        className={`flex items-center gap-5 p-3 px-7 rounded-lg transition-colors duration-200 
                    ${isActive ? 'bg-linear-to-r from-[#fa9c0f] to-[#F4350A] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      >
        <div className="relative w-6 h-6 shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="24px"
            className="object-contain"
          />
        </div>
        <span className="text-sm font-medium">{name}</span>
      </Link>
    </li>
  );
}