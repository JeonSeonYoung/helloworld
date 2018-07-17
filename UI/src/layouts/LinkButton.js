import React, { Component } from 'react';

class LinkButton extends Component {
    render() {
        return (
            <div>
                <button className="btn waves-effect waves-light btn-info ml-1" data-toggle="modal"
                        data-target={"#" + this.props.dataTarget}>{this.props.value}</button>

                <div className="modal fade nodisplay" id="myModal" tabIndex="-1" role="dialog"
                     aria-hidden="true">
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
                                        <label>Task name</label>
                                        <input type="text" className="form-control" placeholder="Enter Task Name" /></div>
                                    <div className="form-group">
                                        <label>Assign to</label>
                                        <select className="custom-select form-control pull-right">
                                            <option defaultValue="" >Sachin</option>
                                            <option value="1">Sehwag</option>
                                            <option value="2">Pritam</option>
                                            <option value="3">Alia</option>
                                            <option value="4">Varun</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LinkButton;


