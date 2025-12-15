export const Paragraph = ({ children }) => (
    <p className="paragraph">
        {children}
    </p>
);

export const TextButton = ({ children, className = "", ...props }) => (
    <span
        className={["text-button", className].filter(Boolean).join(" ")}
        {...props}
    >
        {children}
    </span>
);

export const LogoText = ({ children }) => (
    <h1 className="logo-text">
        {children}
    </h1>
);
