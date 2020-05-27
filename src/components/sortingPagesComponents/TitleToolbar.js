import React from 'react'

import SideNavBar from '.././sidebar/SideNavBar';
import SortingPagesNavbar from './SortingPagesNavbar'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import fire from '../.././config/fire';

// This Component includes the SideNavBar component, 
// the title header and the SortingPagesNavbar component
export default function TitleToolbar(props) {

    const [user, setUser] = useState(null);

    let history = useHistory();

    //checks if user is currently logged in
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                setUser(user);
            }else{
                history.push('/');
            }
            
          })
      });

    return (
        <div>
            <SideNavBar />

            <div className="sortingPagesContainer">
                <div style={titleBtn}>
                    <h1 className="sortedPagePageTitle">{props.program} {props.season} {props.year}</h1>
                    <div style={rosterbuttons}>
                        <button style={uddateRosterBtn}>update roster</button>
                        <button style={newRosterBtn}>new roster</button>
                    </div>
                </div>

                <SortingPagesNavbar urlPath={props.urlPath}/>

            </div>

        </div>
    )
}

const titleBtn = {
    display: "flex",
    flexDirection: "row",

}

const rosterbuttons = {
    display: "flex",
    flexDirection: "row",
    marginLeft: "40%",
    justifyContent: "center",
	alignItems: "center",
}

const uddateRosterBtn = {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#202E47",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",

}

const newRosterBtn = {
    fontSize: "14px",
    color: "#202E47",
    backgroundColor: "white",
    border: "0.5px solid #202E47",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "10px"

}