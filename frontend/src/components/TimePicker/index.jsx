import { useEffect } from "react";
import { Timepicker, Input, initTE } from "tw-elements"


const TimePicker = ({pickerId, onChange, time}) => {

    useEffect(() => {
        // const use = async () => { await import("tw-elements"); };
        // use();
        initTE({Timepicker, Input})
		const picker = document.querySelector(`#timepicker-inline-24-${pickerId}`);
        picker.addEventListener("input.te.timepicker", (e) => {
            alert(e.target.value);
           onChange(e.target.value);
        });
        // const timepicker = new Timepicker(pickerInline, { format24: true, inline: true, defaultTime: '17:00' });

	}, []);

    return (
    <>
        <div className="relative" id={`timepicker-inline-24-${pickerId}`} 
            data-te-timepicker-init 
            data-te-input-wrapper-init 
            data-te-inline data-te-format24>
            <input
                value={time}
            
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id={pickerId} />
            <label
                htmlFor={pickerId}
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
            </label>
    </div>
    </>
    );
};

export default TimePicker;
