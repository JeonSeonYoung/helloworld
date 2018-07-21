
import React, { Component } from 'react';
import ModalButton from "../ModalButton";

class Location extends Component {

    state = {
        distance: '1km'
    }

    changeDropdownText(newDistance) {
        newDistance += "km";

        if (newDistance == -1)
            newDistance = "제한없음";

        this.setState({
            distance: newDistance
        })
    }

    render() {
        return (
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
                    </div>
                    <ModalButton value="내 위치 다시설정" />
                </div>
            </div>
        );
    }
}

export default Location;