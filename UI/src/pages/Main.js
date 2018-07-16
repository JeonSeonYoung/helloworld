import React, { Component } from 'react';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Button from "../layouts/Button";
import DropDownToggle from "../layouts/DropDownToggle";
import Message from "../layouts/Message";
import RightFloatButton from "../layouts/RightFloatButton";
import Search from "../layouts/Search";

class Main extends Component {

    render() {
        return (
            <div className="m-t-30">
                <Search/>
                <Button />
                <DropDownToggle/>
                <div className="card">
                    <div className="card-body">
                        <div className="message-box contact-box">
                            <div className="message-widget contact-widget">
                                <Message/>
                            </div>
                        </div>
                    </div>
                </div>
                <RightFloatButton/>
            </div>
        );
    }
}

export default Main;
