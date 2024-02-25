import React from 'react';
// @ts-ignore
import { clsx } from '../utils/clsx';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={32}
        height={32}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.286 3.348a4.399 4.399 0 0 1 3.428 0c.543.23 1.036.566 1.451.99.397.407.716.885.943 1.41a.967.967 0 0 0 1.026.58 3.335 3.335 0 0 1 2.463.617 3.457 3.457 0 0 1 1.35 2.188 3.502 3.502 0 0 1-.52 2.53 3.383 3.383 0 0 1-.52-2.53 3.502 3.502 0 0 1 1.35-2.188 3.383 3.383 0 0 1 2.463-.617.967.967 0 0 0 1.026-.58 4.685 4.685 0 0 1 .943-1.41c.415-.424.908-.76 1.451-.99ZM3.44 18.541h11.12V21H3.44v-2.46Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Image>
      <span className="ml-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
        SmartCookAi
      </span>
    </div>
  );
};

export default Logo;