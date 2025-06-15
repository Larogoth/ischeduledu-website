
import React from 'react';

interface AppStoreButtonProps {
    variant?: 'dark' | 'light';
    className?: string;
}

const AppStoreButton = ({ variant = 'dark', className = '' }: AppStoreButtonProps) => {
    const src = variant === 'dark' 
        ? "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400"
        : "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400";

    return (
        <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-block group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-600/50 focus:ring-offset-2 ${className}`}
            aria-label="Download iSchedulEDU on the App Store"
        >
            <img 
                src={src}
                alt="Download iSchedulEDU on the App Store" 
                className="w-[250px] h-auto object-contain relative z-10"
                width="250"
                height="83"
            />
        </a>
    );
};

export default AppStoreButton;
