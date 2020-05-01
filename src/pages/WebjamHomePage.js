import React from 'react'
import add from '.././assets/add.svg'

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";

export default function WebjamHomePage() {

    let history = useHistory();
    const addRoster = () => {
        // alert("Add Roster button clicked!")
        history.push('/template');
    }

    return (
        <div>
            <SideNavBar chosen="webjam"/>

            <div className="programPageContainer">
                <h1 className="programPageTitle">webjam</h1>

                <div className="hozLineDivider"></div>

                <button onClick={addRoster} className="programPageAddRosterBtn">
                    <img src={add} className="addLogo" alt="logo"/>
                    <h4 className="addRosterLaber">Add Roster</h4>
                </button>

            </div>

        </div>
    )
}