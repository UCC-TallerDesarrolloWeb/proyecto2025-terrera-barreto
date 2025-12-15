const Button = ({ isWhite, withBorder, className = "", children, ...props }) => {
    const classes = [
        "btn",
        isWhite ? "btn--white" : "",
        withBorder ? "btn--border" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
