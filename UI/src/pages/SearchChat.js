import React, { Component } from 'react';
import DropDownToggle from "../layouts/DropDownToggle";
import ModalButton from "../layouts/ModalButton";
import CirlcleIcon from "../layouts/CircleIcon";
import Map from "../pages/Map";

// 메인화면에서 상세검색 하면 뜨는 부분
class SearchChat extends Component {
    render() {
        return (
            <div className="m-t-30">
                <h5>위치설정</h5>
                <br/>
                {/*1km, 5km, 10km, 50km,*/}
                <DropDownToggle/>
                <ModalButton />
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-info" type="button">검색</button>
                </span>
                <br/>
                <h5>선택된 관심분야</h5>
                <CirlcleIcon/>
                <br/>
                <h5>추천 관심분야</h5>
                <CirlcleIcon/>
                <Map/>
            </div>
        );
    }
}

export default SearchChat;


