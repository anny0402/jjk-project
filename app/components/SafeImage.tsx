'use client';

import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
}

const SafeImage = ({ src, alt, className, fallbackText, ...props }: SafeImageProps) => {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className={`jjk-placeholder ${className}`}>
                <span className="relative z-10 text-center px-4 font-bold text-jjk-purple shadow-black drop-shadow-md">
                    {fallbackText || "CURSED OBJECT MISSING"}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
};

export default SafeImage;
