'use client';

interface InputProps {
    type?: string,
    title?: string,
    required?: boolean,
    placeHolder: string,
    name?: string,
    value: string,
    onChange: any,
    error?: string
}

function WBInput ({type = 'text', title, name, placeHolder, value, error, required = false, onChange}: InputProps) {
    return (
        <>
            <span className="text-sm">{title}</span>
            <input
                type={type}
                placeholder={placeHolder}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none"
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </>
    )
}

export default WBInput