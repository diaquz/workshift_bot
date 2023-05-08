import { Footer } from 'flowbite-react';

const CustomFooter = () => {
    return (
        <Footer container={true}>
            <Footer.Copyright by="Андрей Федин" year={2023}/>
            <Footer.LinkGroup className="flex justify-center space-x-4">
                <Footer.Link>About</Footer.Link>
                <Footer.Link>Privacy Policy</Footer.Link>
                <Footer.Link>Licensing</Footer.Link>
                <Footer.Link>Contact</Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    );
}

export default CustomFooter;
