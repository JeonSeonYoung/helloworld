import React, { Component } from 'react';

class Setting extends Component {
    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Task</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>닉네임</label>
                                <input type="text" className="form-control" placeholder="Enter Task Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">위치설정</label>
                                <input type="text" id="example-location" name="example-location"
                                       className="form-control" placeholder="10km"/>
                            </div>
                            <div className="form-group">
                                <label>관심분야</label>
                                <div id="example-like">
                                    <div className="form-check">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"/>
                                            <span className="custom-control-indicator"></span>
                                            <span className="custom-control-description">반려동물</span>
                                        </label>
                                    </div>
                                    <div className="form-check bd-example-indeterminate">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"/>
                                            <span className="custom-control-indicator"></span>
                                            <span
                                                className="custom-control-description">문화/공연</span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"/>
                                            <span className="custom-control-indicator"></span>
                                            <span className="custom-control-description">전시</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="form-group">*/}
                                {/*<label>Assign to</label>*/}
                                {/*<select className="custom-select form-control pull-right">*/}
                                    {/*<option defaultValue="" >Sachin</option>*/}
                                    {/*<option value="1">Sehwag</option>*/}
                                    {/*<option value="2">Pritam</option>*/}
                                    {/*<option value="3">Alia</option>*/}
                                    {/*<option value="4">Varun</option>*/}
                                {/*</select>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-dismiss="modal">저장</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;