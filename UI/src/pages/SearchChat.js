import React, { Component } from 'react';
import ModalButton from "../layouts/ModalButton";
import TypeIcon from '../layouts/TypeIcon';

class SearchChat extends Component {
    state = {
        selectedIcon: []
    };

    // '관심분야' 선택하면 id(text) 에 해당하는 icon 을 '선택된 관심분야'에 추가한다.
    // 반대일 경우, 제거해야 한다.

    getSelectedIcon = (id, doAdd) => {
        console.log(id, doAdd);
        if (doAdd) {
            this.setState(prevState => ({
                selectedIcon: prevState.selectedIcon.push(id)
            }))
        }
        // this.state.selectedIcon.filter(
        //     item => item !== id
        // )
        //
        // this.state.selectedIcon.map( (item) => {
        //         //     if (item != id) {
        //         return (<TypeIcon text={id} />);
        //     }
        // })

        this.setState(prevState => ({
             selectedIcon: prevState.selectedIcon.push(id)
        }))

        console.log(this.state.selectedIcon);
    }

    addSelectedIcon = (id, doAdd) => {
        console.log(id, doAdd);
        this.setState(prevState => ({
            selectedIcon: prevState.selectedIcon.push(id)
        }))

        if (doAdd) {


        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">채팅방 찾기</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">
                        <form>
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
                                    <ModalButton value="내 위치 다시설정" />
                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">선택된 관심분야</label>
                                <div className="container">
                                    <div className="row">
                                        {console.log(this.state.selectedIcon)}
                                        {/*{this.state.selectedIcon.map((icon)=> {*/}
                                            {/*return icon;*/}
                                            {/*/!*<TypeIcon text={icon} />*!/*/}
                                        {/*})}*/}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>관심분야</label>
                                <div className="container">
                                    <div className="row mb-2">
                                        <div className="col-sm"><TypeIcon text="반려동물" /></div>
                                        <div className="col-sm"><TypeIcon text="문화/공연" onClick={this.addSelectedIcon} /></div>
                                        <div className="col-sm"><TypeIcon text="봉사" getSelectedIcon={this.getSelectedIcon} /></div>
                                        <div className="col-sm"><TypeIcon text="운동/스포츠" /></div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm"><TypeIcon text="책/글" /></div>
                                        <div className="col-sm"><TypeIcon text="직무" /></div>
                                        <div className="col-sm"><TypeIcon text="외국어" /></div>
                                        <div className="col-sm"><TypeIcon text="음악/악기" /></div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm"><TypeIcon text="댄스/무용" /></div>
                                        <div className="col-sm"><TypeIcon text="사교/인맥" /></div>
                                        <div className="col-sm"><TypeIcon text="사진" /></div>
                                        <div className="col-sm"><TypeIcon text="야구관람" /></div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm"><TypeIcon text="게임/오락" /></div>
                                        <div className="col-sm"><TypeIcon text="요리/제조" /></div>
                                        <div className="col-sm"><TypeIcon text="가족/결혼" /></div>
                                        <div className="col-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-block" data-dismiss="modal">저장</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchChat;


