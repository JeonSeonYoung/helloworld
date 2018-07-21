
import React, { Component } from 'react';
import TypeIcon from '../TypeIcon2';

class InterestCombo extends Component {

    // <Checkbox text="문화/공연" onChange={this.handleChange}/>

    render() {
        return (
            <div className="container">
                <div className="row">
                    <TypeIcon text="pet" onClick={this.getSelectedIcon} />
                    <TypeIcon text="culture/performance" onClick={this.getSelectedIcon} />
                    <TypeIcon text="exhibition" onClick={this.getSelectedIcon}/>
                    <TypeIcon text="volunteer" onClick={this.getSelectedIcon} />
                    <TypeIcon text="exercise/sports" onClick={this.getSelectedIcon} />
                    <TypeIcon text="books/articles" onClick={this.getSelectedIcon} />
                    <TypeIcon text="job" onClick={this.getSelectedIcon}/>
                    <TypeIcon text="foreign language" onClick={this.getSelectedIcon} />
                    <TypeIcon text="music/musical instruments" onClick={this.getSelectedIcon} />
                    <TypeIcon text="dance" onClick={this.getSelectedIcon} />
                    <TypeIcon text="social network" onClick={this.getSelectedIcon} />
                    <TypeIcon text="photo" onClick={this.getSelectedIcon} />
                    <TypeIcon text="baseball watching" onClick={this.getSelectedIcon} />
                    <TypeIcon text="game / entertainment" onClick={this.getSelectedIcon} />
                    <TypeIcon text="cooking / manufacturing" onClick={this.getSelectedIcon} />
                    <TypeIcon text="family / marriage" onClick={this.getSelectedIcon} />
                </div>
            </div>

            // <div className="form-check sj-check-padding">
            //     <Checkbox text="pet" onChange={this.handleChange}/>
            //     <Checkbox text="culture/performance" onChange={this.handleChange}/>
            //     <Checkbox text="exhibition" onChange={this.handleChange}/>
            //     <Checkbox text="volunteer" onChange={this.handleChange}/>
            //     <Checkbox text="exercise/sports" onChange={this.handleChange}/>
            //     <Checkbox text="books/articles" onChange={this.handleChange}/>
            //     <Checkbox text="duty" onChange={this.handleChange}/>
            //     <Checkbox text="foreign language" onChange={this.handleChange}/>
            //     <Checkbox text="music/musical instruments" onChange={this.handleChange}/>
            //     <Checkbox text="dance" onChange={this.handleChange}/>
            //     <Checkbox text="social network" onChange={this.handleChange}/>
            //     <Checkbox text="photo" onChange={this.handleChange}/>
            //     <Checkbox text="baseball watching" onChange={this.handleChange}/>
            //     <Checkbox text="game / entertainment" onChange={this.handleChange}/>
            //     <Checkbox text="cooking / manufacturing" onChange={this.handleChange}/>
            //     <Checkbox text="family / marriage" onChange={this.handleChange}/>
            // </div>
        );
    }
}

export default InterestCombo;