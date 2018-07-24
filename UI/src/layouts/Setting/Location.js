
import React, { Component } from 'react';
import ModalButton from "../ModalButton";

class Location extends Component {

    state = {
        distance: this.props.distance + "km"
    }

    changeDropdownText(newDistance) {

        // 부모한테도 값을 넘겨준다.
        this.props.changeDistance(newDistance);

        newDistance += "km";

        if (newDistance === "-1km")
            newDistance = "unlimited";

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
                            <a className="dropdown-item" onClick={() => {this.changeDropdownText(1)}} href={null}>1km</a>
                            <a className="dropdown-item" onClick={() => {this.changeDropdownText(5)}} href={null}>5km</a>
                            <a className="dropdown-item" onClick={() => {this.changeDropdownText(10)}} href={null}>10km</a>
                            <a className="dropdown-item" onClick={() => {this.changeDropdownText(-1)}} href={null}>제한없음</a>
                        </div>
                    </div>
                    <ModalButton value="reset my location" />
                </div>
            </div>
        );
    }
}

export default Location;