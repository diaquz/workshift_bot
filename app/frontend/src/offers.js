import { useState, useEffect } from "react";
import './tailwind.css';
import {
  Timeline,
  Button,
  Card,
  Tabs
} from "flowbite-react";

function WorkshiftItems() {
    return (
        <ul className="divide-y divide-gray-200">
            <li className="py-3 sm:py-4"> 
                <p className="truncate text-sm font-medium text-gray-900"> Рабочая смена (8:00 - 17:00) </p>
                <p className="truncate text-sm text-gray-500"> Андрей Федин </p>
             </li>
        </ul>
    );
}

export default function OffersScreen() {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    if(width < 960)
        return (
            <Card className="m-10 min-h-screen">
                <Tabs.Group className="mx-auto">
                    <Tabs.Item title="Мои обмены">
                        <WorkshiftItems/>
                    </Tabs.Item>
                    <Tabs.Item title="Доступные обмены">
                        <WorkshiftItems/>
                    </Tabs.Item>
                </Tabs.Group>
            </Card>
        );
    
    return (
        <Card className="m-10 min-h-screen">
            <div className="container mx-auto flex flex-row">
                <div className="basis-2/4">
                    <WorkshiftItems/>
                </div>
                <div className="basis-2/4">
                    <WorkshiftItems/>
                </div>
            </div>
        </Card>
    );
}
