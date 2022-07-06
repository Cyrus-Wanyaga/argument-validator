import React from "react";
import Head from "next/head";

class Layout extends React.Component {
    render() {
        return (
            <>
                <Head>
                    <title>{this.props.title}</title>
                </Head>
                {this.props.children}
            </>
        )
    }
}

export default Layout;