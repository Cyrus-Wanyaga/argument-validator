import React from "react";
import Head from "next/head";

class Layout extends React.Component {
    render() {
        return (
            <>
                <Head>
                    <title>{this.props.title}</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                </Head>
                {this.props.children}
            </>
        )
    }
}

export default Layout;