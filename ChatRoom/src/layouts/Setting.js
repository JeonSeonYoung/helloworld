import React, { Component } from 'react';
import Checkbox from '../layouts/Checkbox';
import ModalButton from "./ModalButton";
import comm from '../resources/utils/CommonVariables';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            distance: "1km",
            preference: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    changeDropdownText(newDistance) {
        newDistance += "km";

        if (newDistance == -1)
            newDistance = "제한없음";

        this.setState({
            distance: newDistance
        })
    }

    // 관심분야 추가/삭제
    handleChange(isChecked) {
        console.log(isChecked);
    }

    // 설정 데이터 저장
    saveSetting() {
        // 설정데이터 가져오기
        // var datas = this.state;

        // 관심분야
        var interests = this.state.preference.map( (interest) => {
            return comm.getInterestId(interest);
        })
        // interestID 관심분야 id
    }

    render() {
        return (
            <div className="p-t-30">
                <h4 className="modal-title">설정</h4>
                <div className="form-group">
                    <label>NickName</label>
                    <input type="text" className="form-control" placeholder="Enter Nick Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="example-location">Location Setting</label>
                    <div className="" >
                        <div className="dropdown btn-group" role="group">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                {this.state.distance}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => {this.changeDropdownText(1)}} href="#">1km</a>
                                <a className="dropdown-item" onClick={() => {this.changeDropdownText(5)}} href="#">5km</a>
                                <a className="dropdown-item" onClick={() => {this.changeDropdownText(10)}} href="#">10km</a>
                                <a className="dropdown-item" onClick={() => {this.changeDropdownText(-1)}} href="#">제한없음</a>
                            </div>
                            {/*<input type="text" id="example-location" name="example-location"*/}
                                   {/*className="form-control" placeholder="10km"/>*/}
                        </div>
                        <ModalButton value="내 위치 다시설정" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Interests</label>
                    <div className="message-box contact-box soo-card m-t-10">
                        <div className="message-widget contact-widget">
                            <div id="example-like">
                                <div className="form-check sj-check-padding">
                                    {/*<Checkbox text="반려동물"/>*/}
                                    <Checkbox text="문화/공연" onChange={this.handleChange}/>
                                    {/*<Checkbox text="봉사"/>*/}
                                    {/*<Checkbox text="운동/스포츠"/>*/}
                                    {/*<Checkbox text="책/글"/>*/}
                                    {/*<Checkbox text="직무"/>*/}
                                    {/*<Checkbox text="외국어"/>*/}
                                    {/*<Checkbox text="음악/악기"/>*/}
                                    {/*<Checkbox text="댄스/무용"/>*/}
                                    {/*<Checkbox text="사교/인맥"/>*/}
                                    {/*<Checkbox text="사진"/>*/}
                                    {/*<Checkbox text="야구관람"/>*/}
                                    {/*<Checkbox text="게임/오락"/>*/}
                                    {/*<Checkbox text="요리/제조"/>*/}
                                    {/*<Checkbox text="가족/결혼"/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success justify-content-end"
                            onClick={this.saveSetting}>저장</button>
                </div>
            </div>
        );
    }
}

export default Setting;