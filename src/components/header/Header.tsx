import React from 'react';

type HeaderProps = {
    title: string;
    subtitle: string;
}

function Header(header : HeaderProps) {
    return (
        <section className="item header">
            <h1>{header.title}</h1>
            <h4>{header.subtitle}</h4>
        </section>
    )
}

export default Header;