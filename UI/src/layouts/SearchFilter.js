import React, { Component } from 'react';
import ModalButton from "./ModalButton";
import TypeIcon from './TypeIcon2';
import InterestCombo from './Setting/InterestCombo';

// SideNav 에 있는 채팅방 검색 화면
class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            selectedInterest: []
        };
    }

    // render 다음에 작동
    componentDidMount(){
        this._getsettingdata()
    }

    // '관심분야' 선택하면 id(text) 에 해당하는 icon 을 '선택된 관심분야'에 추가하고,
    // 선택된 걸 다시 클릭했을 땐 '선택된 관심분야'에서 제거한다.

    getSelectedIcon = (disabled, id) => {
        var active = !disabled;

        // 위의 아이콘에 토글기능.
        if (active) {
            this.setState(prevState => ({
                active: !prevState.active,
                interestData: prevState.interestdata
                    .concat(<TypeIcon text={id} key={id} onClick={this.deleteIcon} />)
            }))
        }
        else {
            // '선택된 관심분야' 에서 해당 아이콘 지워준다.
            this.setState( prevState => ({
                interestData: prevState.interestdata.filter((item) => {
                    return item.key !== id
                })
            }));
        }
    }

    deleteIcon = (disabled, id) => {

        // console.log("toggle!" + id);
        this.setState( prevState => ({
            interestData: prevState.interestdata.filter((item) => {
                return item.key !== id
            })
        }));

        // 관심분야도 toggle 줘야 한다.
        // disabled 없애기
        // $("button:contains(" + id + ")").removeClass("disabled");
    }

    addSelectedIcon = (id, doAdd) => {
        console.log(id, doAdd);
        this.setState(prevState => ({
            interestData: prevState.interestdata.push(id)
        }))

        if (doAdd) {


        }
    }

    _getsettingdata = async () => {
        const interestdata = await this._callInterestdataApi();

        this.setState({
            interestdata
        })
    }

    _callInterestdataApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getallinterest', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

    _loadingInterestFun = (() =>{
        var lData = this.state.interestdata.map((pData, index) => {
            return <InterestCombo interest={pData.name} key={index} />
        })
        return lData
    })

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Search Filter</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="example-location">위치설정</label>
                            <div className="" >
                                <div className="dropdown btn-group" role="group">
                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        1km
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">1km</a>
                                        <a className="dropdown-item" href="#">5km</a>
                                        <a className="dropdown-item" href="#">10km</a>
                                        <a className="dropdown-item" href="#">제한 없음</a>
                                    </div>
                                </div>
                                <ModalButton value="reset my location" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Selected Interests</label>
                            {this.state.selectedInterest.map((icon)=> {
                                return icon;
                            })}
                        </div>
                        <div className="form-group">
                            <label>Interests</label>
                            <div className="container">
                                <div className="row">
                                    {
                                        this.state.interestdata ? this._loadingInterestFun() : "Loading...."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-block" data-dismiss="modal">저장</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchFilter;


