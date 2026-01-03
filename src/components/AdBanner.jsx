import React, { useEffect } from 'react';

const AdBanner = ({ slotId, format = 'auto', responsive = 'true', className = '', isDebug = false }) => {
    useEffect(() => {
        if (!isDebug) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense error:', e);
            }
        }
    }, [isDebug]);

    if (isDebug) {
        return (
            <div className={`bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center text-gray-500 dark:text-gray-400 font-mono text-xs overflow-hidden ${className}`}>
                [Ad Space: {slotId || 'Auto'}]
            </div>
        );
    }

    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4659199146828242"
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive={responsive}
        />
    );
};

export default AdBanner;
