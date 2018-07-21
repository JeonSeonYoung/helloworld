import React, { Component } from 'react';
import Checkbox from '../layouts/Checkbox';
import ModalButton from "./ModalButton";

class Setting extends Component {
    state = {
        distance: "1"
    }

    componentDidMount() {

    }

    changeDropdownText(newDistance) {
        this.setState({
            distance: newDistance
        })
    }

    render() {
        return (
            <div className="p-t-30">
                <h4 className="modal-title">설정</h4>
                <div className="form-group">
                    <label>닉네임</label>
                    <input type="text" className="form-control" placeholder="Enter Nick Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="example-location">위치설정</label>
                    <div className="" >
                        <div className="dropdown btn-group" role="group">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                {this.state.distance}km
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => {this.changeDropdownText(1)}} href="#">1km</a>
                                <a className="dropdown-item" onClick={() => {this.changeDropdownText(5)}} href="#">5km</a>
                                <a className="dropdown-item" href="#">10km</a>
                                <a className="dropdown-item" href="#">제한 없음</a>
                            </div>
                        </div>
                        <ModalButton value="내 위치 다시설정" />
                    </div>
                </div>
                <div className="form-group">
                    <label>관심분야</label>
                    <div className="message-box contact-box soo-card m-t-10">
                        <div className="message-widget contact-widget">
                            <div id="example-like">
                                <div className="form-check sj-check-padding">
                                    <Checkbox text="반려동물"/>
                                    <Checkbox text="문화/공연"/>
                                    <Checkbox text="봉사"/>
                                    <Checkbox text="운동/스포츠"/>
                                    <Checkbox text="책/글"/>
                                    <Checkbox text="직무"/>
                                    <Checkbox text="외국어"/>
                                    <Checkbox text="음악/악기"/>
                                    <Checkbox text="댄스/무용"/>
                                    <Checkbox text="사교/인맥"/>
                                    <Checkbox text="사진"/>
                                    <Checkbox text="야구관람"/>
                                    <Checkbox text="게임/오락"/>
                                    <Checkbox text="요리/제조"/>
                                    <Checkbox text="가족/결혼"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success justify-content-end">저장</button>
                </div>
            </div>
        );
    }
}

export default Setting;