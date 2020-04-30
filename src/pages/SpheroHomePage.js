import React from 'react'
import add from '.././assets/add.svg'

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";

export default function SpheroHomePage() {

    let history = useHistory();
    const addRoster = () => {
        // alert("Add Roster button clicked!")
        history.push('/template');
    }

    return (
        <div>
            <SideNavBar />

            <div className="programPageContainer">
                <h1 className="programPageTitle">sphero</h1>

                <div className="hozLineDivider"></div>

                <button onClick={addRoster} className="programPageAddRosterBtn">
                    <img src={add} className="addLogo" alt="logo"/>
                    <h4 className="addRosterLaber">Add Roster</h4>
                </button>

            </div>

        </div>
    )
}