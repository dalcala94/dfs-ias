import React from 'react'

import SideNavBar from '../../../components/sidebar/SideNavBar';
import SortingPagesNavbar from '../../../components/sortingPagesComponents/SortingPagesNavbar'
import TitleToolbar from '../../.././components/sortingPagesComponents/TitleToolbar';
import SortedInstructorsCard from '../../../components/sortingPagesComponents/SortedInstructorsCard';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import car from '../../.././assets/car.png';
import carMentor from '../../.././assets/carMentor.png';
import mentor from '../../.././assets/mentor.png';
import birb from '../../.././assets/animalIcons/birb.png';



import fire from '../../.././config/fire';
import firebase from 'firebase';

import userCollection from '../../../mockDatabase/MockDatabase';

// const sortedRosterCollection = fire.database().ref().child('sortedroster');
export default function AppjamSortedRosterPage() {

    //User auth 
    const [user, setUser] = useState(null);

    //dummy data
    const [carr, setCarr] = useState(
        {
            "school": "Carr Intermediate",
            "mentors": [
                {
                    "name":"Hannah Fragante",
                    "firstName": "Hannah",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "Yes",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },
                {
                    "name":"Dylan Fragante",
                    "firstName": "Dylan",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "No",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },
                {
                    "name":"Annie Fragante",
                    "firstName": "Annie",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "Yes",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },
                {
                    "name":"Deodato Fragante",
                    "firstName": "Deodato",
                    "car": "Yes",
                    "languages": "Tagalog",
                    "multipleDays": "Yes",
                    "prevMentor": "Yes",
                    "region": "Orange County",
                    "schoolName": "Carr",
                },

            ]
            
        }
    );
    const [isLoading, setIsLoading] = useState(false)
    const [schools, setSchools] = useState([]);    
    const sortedRosterCollection = useRef(fire.database().ref().child('sortedroster'))
    const appjamSortedRosterCollection = useRef(fire.database().ref().child('AppJam+/matches'))

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

      useEffect(() => {
        fetch("/hello").then(response =>
        response.json().then(data => {
            console.log(data)
            console.log("API WORKED!!")
        }))

        var latestRoster = 0;
        appjamSortedRosterCollection.current.on('value', (snap) => {
            snap.forEach((doc) =>{
                console.log(parseInt(doc.key), "NEW!!!!NEW!!!")
                if (latestRoster < doc.key){
                    latestRoster = doc.key
                }
            });
            console.log("LATEST ROSTER:",latestRoster)
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

        // const data = {"Program":"AppJam+"};

        // fetch('/sort', {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        // console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
        

      },[]);

      
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
    //             // console.log(mentorArray)
    //             const schoolMentor = {school:school, mentors: mentorArray};
    //             roster.push(schoolMentor);
    //         });
    //         setSchools(roster);
    //     });
    // },[]);

    // console.log(carr)
    // console.log(schools)

    // const test = () => {
    //     return {"school":"carr"}
    // }

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

    const resortClicked = (e) => {
        // history.push('/appjamhome/sortedroster');
        setIsLoading(!isLoading);
        promiseRoster()
        .then(([sorted]) => {
            // both have loaded!
            setIsLoading(!isLoading);
            console.log("PROMISE DONE=RESORTED!!!!",sorted);
            window.location.reload();
        })
    }


    return (
        <div>
            {isLoading?(
                <div style={loading}>
                <h3>RE-SORTING.... Please Wait.</h3>
            </div>
            ):null}

            <TitleToolbar program="appjam+" season="Spring" year="2020" urlPath="appjam"/>

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
                        <button style={resortBtn} onClick={resortClicked}>Re-sort!</button>
                        <button style={saveBtn}>SAVE!</button>
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
    marginLeft: "10px"

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