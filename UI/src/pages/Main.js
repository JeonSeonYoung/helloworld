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
            <div>
                <Header/>
                <Search/>
                <Button />
                <DropDownToggle/>
                <div class="card">
                    <div class="card-body">
                        <div class="message-box contact-box">
                            <div class="message-widget contact-widget">
                                <Message/>
                            </div>
                        </div>
                    </div>
                </div>
                <RightFloatButton/>
                <Footer/>
            </div>
        );
    }
}

export default Main;
