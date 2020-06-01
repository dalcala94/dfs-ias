import React from 'react'

import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import SortedInstructorsCard from '../../../components/sortingPagesComponents/SortedInstructorsCard';

import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import GeneratePDF from '../SaveAsPDF/GeneratePDF';
import { PDFDownloadLink } from "@react-pdf/renderer";

import car from '../../.././assets/car.png';
import carMentor from '../../.././assets/carMentor.png';
import mentor from '../../.././assets/mentor.png';
import birb from '../../.././assets/animalIcons/birb.png';

import fire from '../../.././config/fire';

/* 
    this page shows the sorted roster for appjam
*/
export default function AppjamSortedRosterPage() {

    //User auth 
    const [user, setUser] = useState(null);

    //variable for toggling the modal to ask user if they really want to re-sort
    const [showResortModal, setShowResortModal] = useState(false)

    //stores the sorted roster taken from the database
    const [schools, setSchools] = useState([]);    

    //stores the quarter from the database
    const [quarter, setQuarter] = useState("");

    //stores the year from the database
    const [year, setYear] = useState("");

    //History hook for navigation
    let history = useHistory();

    //checks if user is currently logged in (authenticates user)
    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user){
                setUser(user);
            }else{
                history.push('/');
            }
            
          })
      },[]);

    //accesses firebase for appjam's quarter and year
    const quarterYearDatabase = useRef(fire.database().ref().child('seasonYear/-M8idEUsNN1M5VcJDv-I/appjam'))

    //accesses firebase for quarter and the year
    useEffect(() => {
        quarterYearDatabase.current.once('value', (snap) => {
            const quarterYear = snap.val();
            console.log("CURRENT QUARTER:", quarterYear)
            setQuarter(quarterYear.quarter);
            setYear(quarterYear.year);
        });
    },[]);

    //accesses firebase for the sorted roster
    const sortedRosterCollection = useRef(fire.database().ref().child('sortedroster'))

    //accesses firebase for the sorted roster
    // useEffect(() => {
    //     sortedRosterCollection.current.once('value', (snap) => {
    //         const roster = []
    //         snap.forEach((doc) =>{
    //             const school = doc.key;
    //             const mentorList = doc.val();
    //             const mentorArray = [];
    //             for (var k in mentorList){
    //                 mentorArray.push(
    //                     {
    //                         "name":k,
    //                         "firstName": k.split(" ")[0],
    //                         "car": mentorList[k]["Car"],
    //                         "languages": mentorList[k]["Languages"],
    //                         "multipleDays": mentorList[k]["MultipleDays"],
    //                         "prevMentor": mentorList[k]["PreviousMentor"],
    //                         "region": mentorList[k]["Region"],
    //                         "schoolName": mentorList[k]["SchoolName"],
    //                     }
    //                 )
    //             }
    //             const schoolMentor = {school:school, mentors: mentorArray};
    //             roster.push(schoolMentor);
    //         });
    //         setSchools(roster);
    //     });
    // },[]);

    // console.log(schools)

    const appjamSortedRosterCollection = useRef(fire.database().ref().child('AppJam+/matches'));
    const firstChild = useRef(fire.database().ref().child('AppJam+/matches').limitToFirst(1));

    useEffect(() => {
        var matchesLen = 0;

        var latestRoster = 0;
        appjamSortedRosterCollection.current.on('value', (snap) => {
            matchesLen = snap.numChildren();
            console.log("NUMBER OF MATCHES", matchesLen)
            snap.forEach((doc) =>{
                console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
            
            if (parseInt(matchesLen) > 10){
                console.log("ADASDDASDSADSA", matchesLen)
                firstChild.current.once('value', (snap) => {
                    snap.forEach((doc) =>{
                        console.log("OLDEST MATCH",doc.key);
                        doc.ref.remove();
                    });
                })
            }
        });


        appjamSortedRosterCollection.current.once('value', (snap) => {     
            const roster = []      
            snap.forEach((doc) =>{
                if (latestRoster === doc.key){
                    console.log("LATEST ROSTER DOC.KEY:",doc.key, doc.val())
                    const schoolArray = doc.val();
                    for (var school in schoolArray){
                        console.log(school)
                        const mentorInfoArray = []
                        for (var mentor in schoolArray[school]){
                            // console.log(schoolArray[school][mentor]["Languages"])
                            mentorInfoArray.push(
                                {
                                    "name":schoolArray[school][mentor]["TeacherName"],
                                    "firstName": schoolArray[school][mentor]["TeacherName"].split(" ")[0],
                                    "car": schoolArray[school][mentor]["Car"],
                                    "languages": schoolArray[school][mentor]["Languages"],
                                    "multipleDays": schoolArray[school][mentor]["MultipleDays"],
                                    "prevMentor": schoolArray[school][mentor]["PreviousMentor"],
                                    "region": schoolArray[school][mentor]["Region"],
                                    "schoolName": schoolArray[school][mentor]["SchoolName"],
                                }
                            )
                        }
                        roster.push({"school":school, "mentors":mentorInfoArray})
                    }
                    console.log("THE NEW ROSTER YES",roster)
                }
            });
            setSchools(roster)
        });
      },[]);

    const [isLoading, setIsLoading] = useState(false)

    const sortRoster = () => {
        return fetch('/sort', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"Program":"AppJam+"}),
        })
        .then(response => response.json())
    }

    const promiseRoster = () =>{
        return Promise.all([sortRoster()])
    }

    //shows modal if user really wants to re-sort
    const resortClicked = () => {
        console.log("resort");
        setShowResortModal(!showResortModal);
    }

    //re-sort when clicked yes on the modal
    const resortYes = () => {
        console.log("YES RESORT!");
        setShowResortModal(!showResortModal);

        setIsLoading(!isLoading);
        promiseRoster()
        .then(([sorted]) => {
            // both have loaded!
            setIsLoading(!isLoading);
            console.log("PROMISE DONE=RESORTED!!!!",sorted);
            window.location.reload();
        })
    }

    //don't resort when no is clicked on the modal
    const resortNo = () => {
        console.log("DONT RESORT!");
        setShowResortModal(!showResortModal);
    }

    return (
        <div>
            {isLoading?(
                <div style={loading}>
                <h3>RE-SORTING.... Please Wait.</h3>
            </div>
            ):null}

            <TitleToolbar program="appjam+" season={quarter} year={year} urlPath="appjam"/>

            <div className="programPageContainer">

                <div style={iconGuideWrapper}>
                    <div style={box}>
                        <div style={iconGuideContainer}>
                            <div style={iconGuideNamePair}>
                                <div style={iconGuideNamePairAnimal}>
                                    <img src={birb} style={iconGuideIconStyle}/>
                                    <h6 style={iconGuideTextAnimalStyle}>name</h6>
                                </div>
                                <h6 style={iconGuideTextStyle}>previous mentor</h6>
                            </div>

                            <div style={iconGuideNamePair}>
                                <img src={car} style={iconGuideIconStyle}/>
                                <h6 style={iconGuideTextStyle}>has a car</h6>
                            </div>

                            <div style={iconGuideNamePair}>
                                <img src={mentor} style={iconGuideIconStyle} />
                                <h6 style={iconGuideTextStyle}>previous mentor</h6>
                            </div>

                            <div style={iconGuideNamePair}>
                                <img src={carMentor} style={iconGuideIconStyle} />
                                <h6 style={iconGuideTextStyle}>has a car AND previous mentor</h6>
                            </div>
                        </div>
                    </div>

                    <div style={saveResort}>
                        <button onClick={resortClicked} style={resortBtn}>Re-sort!</button>
                        {showResortModal?(
                            <div style={modalContainer}>
                                <div style={modal}>
                                    <h3>Are you sure you want to re-sort?</h3>
                                    <div style={modalOptions}>
                                        <button onClick={resortNo} style={noBtn}>NO</button>
                                        <button onClick={resortYes} style={yesBtn}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        ):null}
                        {/* <button onClick={save} style={saveBtn}>SAVE!</button> */}

                        <PDFDownloadLink
                            document = {<GeneratePDF sortedRoster={schools}/>}
                            fileName="sortedRoster.pdf"
                            style={saveBtn}
                        >
                            Save as PDF!
                        </PDFDownloadLink>

                    </div>
                </div>
                
                <div className="sortedInstructorCardsWrapper">
                    <div className="instructorCardsContainer">
                        {schools.map((schoolMentors,i) => (
                            <SortedInstructorsCard instructors={schoolMentors} SbgColor="#7FC9FF" SborderColor="#0099FF" key={schoolMentors.school}/>
                        ))}
                    </div>
                </div>
            </div> 



        </div>
    )
}

const modalContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(0, 0, 0, 0.5)",
    bottom: 0,
    right: 0,
    
}

const modal = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    width: "25vw",
    height: "20vh",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "45px"
}

const modalOptions = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px"
}

const saveResort = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "20px"
}

const saveBtn = {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "15px",
    // padding: "10px",
    marginLeft: "10px",
    justifyContent: "center",
    alignItems: "center"

}

const resortBtn = {
    fontSize: "14px",
    color: "#49479D",
    backgroundColor: "white",
    border: "0.5px solid #49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",

}

const yesBtn = {
    fontSize: "14px",
    color: "#49479D",
    backgroundColor: "white",
    border: "0.5px solid #49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    justifyContent: "center",
    alignItems: "center",
    width: "5vw",
    marginLeft: "5vw"

}

const noBtn = {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#49479D",
    // border: "0.5px solid #49479D",
    borderRadius: "28px",
    height: "46px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "5vw",
}

const iconGuideWrapper = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "5%",
    marginBottom: "2%"
}

const box = {
    width: "670px",
    height: "70px",
    backgroundColor: "#D2D5DA",
    borderRadius: "10px"
}

const iconGuideContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7px"
}

const iconGuideNamePairAnimal = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}

const iconGuideTextAnimalStyle = {
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "3px",
    color: "#202E47",
}

const iconGuideNamePair = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginleft: "15px",
    marginRight: "15px"
}

const iconGuideIconStyle = {
    width: "35px",
}

const iconGuideTextStyle = {
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "3px",
    color: "#202E47",
    color: "#49479D"
}

const loading = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(32, 46, 71, 0.7)",
    color: "white"
}