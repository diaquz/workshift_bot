
const IconButton = ({icon, onClick}) => {
    return (
    <div className="hover:bg-slate-50 bg-inherit rounded-full" onClick={onClick}>
        <div outline={true} className="p-2">
            {icon}
        </div>
    </div>
    );
};

export default IconButton;
