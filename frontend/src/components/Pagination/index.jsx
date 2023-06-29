
const Page = ({label, disabled, active, onClick}) => {
    return (
    <li>
        <a
            className={`${disabled && "pointer-events-none"} ${active ? "bg-primary-100": " bg-transparent"}
                relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300
                hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
            href="#"
            onClick={onClick}
        >
                {label}
            </a>
    </li>
    );
};

const Pagination = ({number, onPageChange}) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="list-style-none flex"> 
                <Page label="Предыдущая" disabled={number-1 < 1} onClick={() => onPageChange(number - 1)} />
                { [...Array(3).keys()].map(i => 
                    <Page key={i} label={Math.max(1, number-1)+i} onClick={() => onPageChange(Math.max(1, number-1)+i)} active={(Math.max(1, number-1)+i) == number}/>
                )}
                <Page label="Следующая" onClick={() => onPageChange(number + 1)} />
            </ul>
        </nav>
    );
};

export default Pagination;
