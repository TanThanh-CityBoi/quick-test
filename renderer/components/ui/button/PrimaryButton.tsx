type SubProps = {
    background?: string;
    icon?: React.ReactNode;
    content?: string;
};

const PrimaryButton = ({
    className,
    background,
    icon,
    content,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & SubProps) => {
    return (
        <>
            <button
                className={`flex items-center justify-center 
                whitespace-nowrap rounded-lg px-4 py-2
                font-normal leading-6 text-white hover:opacity-70
            ${className} 
            ${background || 'from-primary-500 to-primary-700 bg-gradient-to-r'}
            `}
                {...props}
            >
                {icon}
                {content}
            </button>
        </>
    );
};

export default PrimaryButton;
