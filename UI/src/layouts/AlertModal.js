import React, { Component } from 'react';

/**
 * @message 모달창에 띄울 메세지
 */
class AlertModal extends Component {

    closeModal() {
        console.log('close');
    }

    render() {
        return (
            <div>
                <div id="stack1" className="modal hide fade" tabIndex="-1" role="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" data-dismiss="modal" className="btn">Close</button>
                        </div>
                        <div className="modal-body">
                            {/*<button className="btn" data-toggle="modal" href="#stack2">Launch modal</button>*/}
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-dismiss="modal" className="btn">Close</button>

                            <button type="button" className="btn btn-primary">Ok</button>
                        </div>
                    </div>
                </div>

                <div id="stack2" className="modal hide fade" tabIndex="-1" data-focus-on="input:first">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h3>Stack Two</h3>
                    </div>
                    <div className="modal-body">
                        <p>One fine body…</p>
                        <p>One fine body…</p>
                        <input type="text" data-tabindex="1"/>
                        <input type="text" data-tabindex="2"/>
                        <button className="btn" data-toggle="modal" href="#stack3">Launch modal</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" className="btn">Close</button>
                        <button type="button" className="btn btn-primary">Ok</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default AlertModal;


