import React from 'react';
import { Navbar as NavbarType } from '../../shared/interfaces';
import './Navbar.scss';

const Navbar = ({ data } : {data: NavbarType}) => {
    return (
        <nav className="item navbar">
            <div aria-hidden="true" className="navbar-left">
                <img src={data.imageUrl} alt={data.imageAlt} />
            </div>
            <ul className="navbar-right">
                {data.links.map((link, index) => (
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