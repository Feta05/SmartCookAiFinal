import React from 'react';
import GitHubLogo from './GitHubLogo';

const Footer = () => {
  return (
    <footer className="max-w-2xl pb-16 mx-auto space-y-10 lg:max-w-5xl">
      <div className="flex flex-col items-center justify-between gap-5 pt-8 border-t border-zinc-900/5 dark:border-white/5 sm:flex-row">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Made with ♥️ 2024 by{' '}
          <a
            href="https://fetasakiri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Feta Sakiri
          </a>
        </p>
        <div className="flex gap-4">
          <a
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Feta05"
          >
            <GitHubLogo />
            <span className="sr-only">Follow us on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;