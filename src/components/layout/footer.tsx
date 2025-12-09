import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-green-200 dark:border-green-800 bg-white dark:!bg-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
            © {new Date().getFullYear()} Agree Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

