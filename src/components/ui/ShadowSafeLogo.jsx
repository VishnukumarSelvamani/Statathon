import React from 'react';

export const ShadowSafeLogo = ({ className, style }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className={className}
            style={style}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Shield Outline */}
            <path
                d="M50 8 L88 24 V50 C88 72 50 92 50 92 C50 92 12 72 12 50 V24 L50 8 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
            />

            {/* Lock Shackle */}
            <path
                d="M38 48 V38 A12 12 0 0 1 62 38 V48"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
            />

            {/* Lock Body - Filled with cutout for keyhole using fillRule="evenodd" if possible, 
                but using stroke/fill combo for simplicity with currentColor components. 
                Actually, user wants it 'filled' lock. 
                Let's make the body a filled rect and the keyhole a cutout.
            */}
            <path
                d="M32 48 H68 V74 H32 Z"
                fill="currentColor"
                stroke="none"
            />

            {/* Keyhole (Simulated by drawing it in transparent/background color? 
                No, cannot assume background. 
                Better strategy: Use a mask or path exclusion. 
                Let's try path exclusion for the lock body:
                Outer rect: M32 48 H68 V74 H32 Z
                Inner keyhole (counter-clockwise): M50 55 L48 62 H52 L50 55 Z M50 59 A 2 2 0 1 0 50 55 ... slightly complex for manual path.
                
                Simpler visual: Just a filled lock body with a white keyhole? 
                If the logo is white, the lock is white, valid keyhole is transparent.
                I will use a mask for the keyhole.
            */}
            <defs>
                <mask id="keyhole-mask">
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <circle cx="50" cy="58" r="3" fill="black" />
                    <path d="M50 58 L46 68 H54 L50 58 Z" fill="black" />
                </mask>
            </defs>
            <path
                d="M32 48 H68 V76 H32 Z"
                fill="currentColor"
                stroke="none"
                mask="url(#keyhole-mask)"
            />
        </svg>
    );
};

export default ShadowSafeLogo;
