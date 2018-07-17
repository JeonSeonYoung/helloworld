import React, { Component } from 'react';
import Button from "../layouts/Button";
import TagButton from "../layouts/TagButton";
import DropDownToggle from "../layouts/DropDownToggle";
import Message from "../layouts/Message";
import RightFloatButton from "../layouts/RightFloatButton";
import Search from "../layouts/Search";
import { Redirect } from 'react-router-dom';
import {BrowserHistory} from 'react-router';

class Main extends Component {

    handleClick = () => {
        console.log('show popup');
    }

    render() {
        return (
            <div className="m-t-30">
                <Search/>
                <div className="m-t-10">
                    <DropDownToggle dropdownData={"최신순, 인기순"} selectedIndex={0}/>
                    <TagButton value={"동물"} />
                    <TagButton value={"IT"} />
                    <div className="float-right">
                        <Button value={"설정"} onClick={() => this.handleClick} />
                    </div>
                </div>

                <div className="message-box contact-box soo-card m-t-10">
                    <div className="message-widget contact-widget">
                        <Message/>
                    </div>
                </div>
                <RightFloatButton/>
            </div>
        );
    }
}

export default Main;
