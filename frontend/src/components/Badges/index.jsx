
const Badge = ({label}) => {
    return (
    <>
        <span 
            className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
        >
            {label}
        </span>
    </>
    );
}

const UserBadge = ({name, onClick}) => {
    return (
    <>
        <span
            onClick={onClick}
            className="inline-block whitespace-nowrap rounded-[0.27rem] bg-secondary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800 hover:bg-secondary-200">
            {name}
        </span>
    </>
    );
};

export { Badge, UserBadge };
