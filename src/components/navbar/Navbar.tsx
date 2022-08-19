import React from 'react';

type NavbarLink = {
    title: string;
    url: string;
}

type NavbarProps = {
    imageUrl: string;
    imageAlt: string;
    links: NavbarLink[];
}

function Navbar(navbar : NavbarProps) {
    return (
        <nav className="item navbar">
            <div aria-hidden="true" className="navbar-left">
                <img src={navbar.imageUrl} alt={navbar.imageAlt} />
            </div>
            <ul className="navbar-right">
                {navbar.links.map((link, index) => (
                    <li className="nav-item" key={index}>
                        <a href={link.url} target="_blank" 
                            rel="noopener noreferrer" title={link.title}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar;