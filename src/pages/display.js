import React, {Component} from 'react';
import fire from '../fire';

class DisplayRosterPage extends Component {
    constructor() {
        super();
        this.state = {
            roster: []
        }
    }
    
    componentDidMount() {
        const rosterRef = fire.database().ref('instructors');
        rosterRef.on('value', (snapshot) => {
            let roster = snapshot.val();
            let newState = [];
            for (let instructor in roster) {
                newState.push({
                    id: instructor,
                    name: roster[instructor].Name
                });
            }
            this.setState({
                roster:newState
            });
        });
    }

    render() {
        return (
            <div className = "container">
                <section className="display-item">
                    <div className="wrapper">
                        <ul>
                            {this.state.roster.map((instructor) => {
                                return (
                                    <li key={instructor.id}>
                                        <h1>{instructor.name}</h1>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

export default DisplayRosterPage;