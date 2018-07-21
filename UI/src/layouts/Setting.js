import React, { Component } from 'react';

class Setting extends Component {

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
                        <h4 className="modal-title">설정</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>NickName</label>
                                <input type="text" className="form-control" placeholder="Enter Task Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-location">Location Setting</label>
                                <input type="text" id="example-location" name="example-location"
                                       className="form-control" placeholder="10km"/>
                            </div>
                            <div className="form-group">
                                <label>interests</label>
                                <div id="example-like">
                                    <div className="form-check">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"/>
                                            <span className="custom-control-indicator"></span>
                                            <span className="custom-control-description">pet</span>
                                        </label>
                                    </div>
                                    <div className="form-check bd-example-indeterminate">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"/>
                                            <span className="custom-control-indicator"></span>
                                            <span
                                                className="custom-control-description">culture/performance</span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input"/>
                                            <span className="custom-control-indicator"></span>
                                            <span className="custom-control-description">exhibition</span>
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