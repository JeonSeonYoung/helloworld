import React, { Component } from 'react';
import Checkbox from '../layouts/Checkbox';

class CreateChat extends Component {

    state = {
  
    }

    // render 다음에 작동
    componentDidMount(){

    }

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">채팅방 개설</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="example-location">채팅방 이름</label>
                                <input type="text" className="form-control" placeholder="Enter Task Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">위치선택</label>
                                <div className="sj-map">지도영역</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">관심분야</label>
                                <div className="form-check">
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
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-success btn-block" data-dismiss="modal">채팅방 개설하기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateChat;
