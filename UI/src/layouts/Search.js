import React, { Component } from 'react';

class Search extends Component {

    state = {
        name : ''
    }

    handleChange = (e) =>{
        this.setState({
            name : e.target.value
        })
    }

    handleSubmit = (e) =>{
        // 페이지 리로딩 방지
        e.preventDefault();
        // 부모에게 전달 전달~
        this.props.onCreate(this.state);
        // 초기화
        this.setState({
            name: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChange} name = "name" placeholder="Search for chat name..." />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Button</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Search;


