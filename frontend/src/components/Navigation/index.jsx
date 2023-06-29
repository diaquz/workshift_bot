import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidenav, Dropdown, Ripple, initTE } from "tw-elements";
import { checkAuth, checkPermissions, currentUser } from "utils/auth";


export const NavigationContext = React.createContext(null);

const Navigation = ({children}) => {
    useEffect(() => {
        initTE({ Sidenav, Dropdown, Ripple });

        const side = document.getElementById("sidenavigation");
        const view = document.getElementById("screen-view")
        const inst = Sidenav.getInstance(side);
        let width = null;
        
        const setMode = (e) => {
            if(window.innerWidth === width) return;

            width = window.innerWidth;
            if(window.innerWidth < inst.getBreakpoint("xl")) {
                inst.changeMode("over");
                inst.hide();
                view.style.marginLeft = "0px";
            } else {
                inst.changeMode("side");
                inst.show();
                view.style.marginLeft = "240px";
            }
        };

        if(window.innerWidth < inst.getBreakpoint("sm")) setMode();
        window.addEventListener("resize", setMode);
    }, []);


    const navigate = useNavigate();
    const [items, setItems] = useState([])
    const [user, setUser] = useState(currentUser())

    useEffect(() => { if(!checkAuth()) navigate('/login') }, []);

    return (
    <>
    <div className="dark:bg-zinc-800">

    <header className="bg-slate-50">
        <nav
            id="sidenavigation"
            className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 xl:data-[te-sidenav-hidden='false']:translate-x-0"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-mode-breakpoint-over="0"
            data-te-sidenav-mode-breakpoint-side="xl"
            data-te-sidenav-content="#content"
            data-te-sidenav-accordion="true">

            <a
                className="mb-3 flex items-center justify-center py-6 outline-none space-x-1"
                href="#!"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        viewBox="0 0 32 32"
                    >
                        <path d="M27.232 3.993h-0.928c-0.442 0-0.8 0.358-0.801 0.8v17.596l-8.467-13.916c-0.143-0.232-0.396-0.384-0.684-0.384h-0.736c-0 0-0 0-0.001 0-0.288 0-0.541 0.153-0.681 0.381l-0.002 0.003-8.437 13.907v-17.588c-0-0.442-0.358-0.8-0.8-0.8h-0.928c-0.442 0-0.8 0.358-0.8 0.8v22.4c0 0.442 0.358 0.8 0.8 0.801h0.799c0.288-0 0.541-0.153 0.682-0.381l0.002-0.003 9.748-16.058 9.75 16.058c0.143 0.232 0.395 0.385 0.684 0.385h0.799c0.442-0.001 0.8-0.359 0.801-0.801v-22.4c-0.001-0.442-0.359-0.8-0.801-0.8v0z"/>
                    </svg>
                <span> Workshift bot </span>
            </a>

            <ul
                className="relative m-0 list-none px-[0.2rem]"
                data-te-sidenav-menu-ref
            >
                <li className="relative">
                    <a
                        className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                        href="#"
                        onClick={() => navigate('/')}
                        data-te-sidenav-link-ref>
                        <span> График </span>
                    </a>
                </li>
                <li className="relative">
                    <a
                        className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                        data-te-sidenav-link-ref>

                        <span>Обмены</span>
                        <span
                        className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 dark:[&>svg]:fill-gray-300"
                        data-te-sidenav-rotate-icon-ref>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                        
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                        </span>
                    </a>
                    <ul
                        className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                        data-te-sidenav-collapse-ref>
                        <li className="relative">
                            <a
                                onClick={() => navigate('/offers')}
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref>
                                    Доступные предложения
                            </a>
                        </li>
                        <li className="relative">
                            <a
                            onClick={() => navigate('/offers/mine')}
                            className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                                Мои предложения
                            </a>
                        </li>
                        <li className="relative">
                            <a
                            onClick={() => navigate('/answers')}
                            className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                                Мои ответы
                            </a>
                        </li>
                    </ul>
                </li>
                { checkPermissions() && <li className="relative">
                    <a
                        className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                        data-te-sidenav-link-ref>

                        <span>Модерация</span>
                        <span
                        className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 dark:[&>svg]:fill-gray-300"
                        data-te-sidenav-rotate-icon-ref>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                        
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                        </span>
                    </a>
                    <ul
                        className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                        data-te-sidenav-collapse-ref>
                        <li className="relative">
                            <a
                                onClick={() => navigate('/moderation')}
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref>
                                    График
                            </a>
                        </li>
                        <li className="relative">
                            <a
                            onClick={() => navigate('/moderation/users')}
                            className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                                Пользователи
                            </a>
                        </li>
                        <li className="relative">
                            <a
                            onClick={() => navigate('/moderation/requests')}
                            className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                                Запросы на регистрацию
                            </a>
                        </li>
                        <li className="relative">
                            <a
                            onClick={() => navigate('/moderation/feedback')}
                            className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                                Обратная связь
                            </a>
                        </li>
                    </ul>
                </li>}
            </ul>
        </nav>

        <nav
            id="main-navbar"
            className="fixed left-0 right-0 top-0 flex w-full flex-nowrap items-center justify-between bg-white py-[0.6rem] text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700 dark:bg-zinc-700 lg:flex-wrap lg:justify-start xl:pl-60"
            data-te-navbar-ref
        >
            <div
                className="flex w-full flex-wrap items-center justify-between px-4">
                <button
                    data-te-sidenav-toggle-ref
                    data-te-target="#sidenavigation"
                    className="block border-0 bg-transparent px-2.5 text-gray-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 xl:hidden"
                    aria-controls="#sidenavigation"
                    aria-haspopup="true">
                    <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#000000"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clipRule="evenodd" />
                        </svg>
                    </span>
                </button>

                {/* <div className="flex flex-row items-center"> */}
                <div className="px-10 flex flex-row space-x-5">
                    {items && items.map((item) => <a key={item.name}  className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 p-1 text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    onClick={() => item.action()}>{item.name}</a> )}
                </div>
                <ul className="relative flex items-center">
                    <li className="relative" data-te-dropdown-ref>
                        <a
                        className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                        href="#"
                        id="user-dropdown"
                        role="button"
                        data-te-dropdown-toggle-ref
                        aria-expanded="false">
                        <img
                            src={user ? user.picture : ""}
                            className="rounded-full"
                            style={{ "height": "22px", "width": "22px" }}
                            alt="Avatar"
                            loading="lazy" />
                        </a>
                        <ul
                            className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
                            aria-labelledby="dropdownMenuButton2"
                            data-te-dropdown-menu-ref>
                        <li>
                            <a
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                            href="#"
                            data-te-dropdown-item-ref>Профиль</a>
                        </li>
                        <li>
                            <a
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                            href="#"
                            data-te-dropdown-item-ref>Выйти</a>
                        </li>
                    </ul>
                </li>
                </ul>
                {/* </div> */}
            </div>

        </nav>
    </header>
    <div id="screen-view" className="ms-60">
        <NavigationContext.Provider value={setItems}>
            {children}
        </NavigationContext.Provider>
    </div>

    </div>
    </>);
};

export default Navigation;
