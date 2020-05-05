import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';

class UploadRosterPage extends Component {
    
    onDrop(files) {
        this.setState({ files });

        var file = files[0];

        const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {

                var userList = [];

                for (var i = 1; i < data.length; i++) {
                    const name = data[i][0];
                    const gender = data[i][1];
                    const ethnicity = data[i][2];
                    const region = data[i][3];
                    const university = data[i][4];
                    const year = data[i][5];
                    const returner = data[i][6];
                    const days_avail_1 = data[i][7];
                    const days_avail_2 = data[i][8];
                    const days_avail_3 = data[i][9];
                    const car = data[i][10];
                    const languages = data[i][11];
                    const shirt = data[i][12];
                    const multiple_days = data[i][13];
                    const newUser = {"Name": name, "Gender": gender, "Ethnicity": ethnicity, "Region": region, "University or College currently attending": university, "Year": year,
                                    "Were you previously an AppJam+ Mentor?": returner, "3:00PM - 5:00PM Days": days_avail_1, "3:30PM - 5:30PM": days_avail_2, "3:45PM - 5:45PM": days_avail_3,
                                    "Car?": car, "Languages": languages, "Shirt Size": shirt, "Teach Multiple Days?": multiple_days};
                    userList.push(newUser);

                    fetch('https://dreamsforschools-ias.firebaseio.com/instructors.json', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUser)
                    })
                };
            });
        };

        reader.readAsBinaryString(file);
    }

    render() {
        const wellStyles = {maxWidth: 400, margin: '0 auto 10px' };
        const fontSize = 5;

        return (
            <div style={mainContainerStyle} align = "center" oncontextmenu="return false">
                <br /><br /><br />
                <div style={dropZoneStyle} className = "dropzone">
                    <h2>Please upload your <font size={fontSize} color="#0099FF">CSV </font>roster...</h2>
                    <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>Drag files or click to upload...</Dropzone>
                    <br /><br /><br />
                </div>
            </div>
        )
    }
}

const mainContainerStyle = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#E5E5E5",
}

const dropZoneStyle = {
    backgroundColor: "white",
    borderRadius: '25px',
    display: "inline-block",
    boxShadow: '0 3px 5px #404040',
    paddingLeft: '100px',
    paddingRight: '100px'
}

export default UploadRosterPage;