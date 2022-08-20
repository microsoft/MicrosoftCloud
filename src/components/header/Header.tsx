import React from 'react';
import { Header as HeaderType } from '../../shared/interfaces';
import './Header.scss';

function Header({ data } : { data: HeaderType }) {
    return (
        <section className="item header">
            <h1>{data.title}</h1>
            <h4>{data.subtitle}</h4>
        </section>
    )
}

export default Header;