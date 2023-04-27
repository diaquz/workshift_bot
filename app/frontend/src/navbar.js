import { useState, useEffect } from "react";
import './tailwind.css';
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";
 
import {
    Navbar,
    
} from "flowbite-react"


export default function Navigation() {

    return (
        <Navbar fluid={true} rounded={true} border={true}>
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Workshift bot
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href={'/'}> График </Navbar.Link>
                <Navbar.Link href={'/offers'}> Обмен </Navbar.Link>
                <Navbar.Link href="https://t.me/NNtksg_bot"> Телеграм бот </Navbar.Link>
                <Navbar.Link> FAQ </Navbar.Link>
                <Navbar.Link> Профиль </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}