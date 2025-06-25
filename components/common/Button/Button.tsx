'use client';
import React from "react";
export default function WBButton ({
    id,
    onClick,
    children,
    className,
    loading = false,
    disabled = false
} :Readonly<{id?: string,onClick?: any, disabled?: any, loading?: boolean, children?: React.ReactNode, className?: string}>) {
    className = className || ''
    const showOverlay = disabled || loading;
    const classStyles = `relative bg-accent px-4 py-2 flex rounded-[10px] text-sm text-white cursor-pointer justify-center ` + className + (showOverlay ? " opacity-60 pointer-events-none" : "");
    return (
        <button className={classStyles} 
            id={id}
            aria-expanded="false" aria-haspopup="true"
            onClick={onClick}
            disabled={disabled}
        >
            {loading && (
                // Simple spinner
                <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
            <div>{children}</div>
        </button>
    )
}