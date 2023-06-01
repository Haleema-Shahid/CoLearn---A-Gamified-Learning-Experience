import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';







const SubmissionsDisplay = () => {
    const { userId, topicId, assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [tags, setTags] = useState([]);
    const [weakTags, setWeakTags] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`http://localhost:4000/backend/t/${userId}/assignment/${assignmentId}/submissions`);
                const data = await response.json();
                console.log(data);
                setSubmissions(data);

                const response2 = await fetch(`http://localhost:4000/backend/t/${userId}/topic/${topicId}/assignment/${assignmentId}`);
                const data2 = await response2.json();
                console.log("fetched: ", data);
                if (data2) {
                    //setClasses(data);
                    console.log("fetched in front end: ", data2);
                    setTags(data2.tags);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);

    const recommendMaterial = async () => {
        try {
            const response = await fetch(`http://localhost:4000/backend/t/${userId}/assignment/${assignmentId}/submissions`);
            const data = await response.json();
            console.log(data);

            // Check if all submissions are marked as true
            const allMarked = data.every(submission => submission.submission.marked === true);

            if (allMarked) {
                console.log("All submissions are marked as true");
                const recommenderResponse = await fetch(`http://localhost:4000/backend/t/${userId}/assignment/${assignmentId}/recommend`);

            } else {
                console.log("Not all submissions are marked as true");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = () => {
        console.log("save clicked");
        console.log(submissions);
        const updatedSubmissions = [];

        for (let i = 0; i < submissions.length; i++) {
            const submission = submissions[i];
            const updatedSubmission = {
                _id: submission.submission._id,
                obtainedmarks: submission.submission.obtainedmarks,
                weaktags: submission.submission.weaktags
            };
            updatedSubmissions.push(updatedSubmission);
        }
        console.log("update here: ", updatedSubmissions);
        // Make the API call to update the obtained marks
        fetch(`http://localhost:4000/backend/t/${userId}/assignment/${assignmentId}/submissions/save`, {
            method: 'PUT', // or 'POST' depending on your backend API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedSubmissions: updatedSubmissions }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Submissions updated successfully");
                // Handle any further logic or updates after successful submission
            })
            .catch((error) => {
                console.error("Error updating submissions:", error);
                // Handle error scenarios if needed
            });


        //TRIGGER RECOMMENDER
        recommendMaterial();

    };
    //---------------------

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const { value } = event.target;
        setWeakTags(value);


    };



    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];


    //..........................................

    return (
        <div>
            <h2>Submissions</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Student Name</th>
                        <th style={styles.tableHeader}>Submission</th>
                        <th style={styles.tableHeader}>Marks</th>
                        <th style={styles.tableHeader}>Select Weakness</th> {/* New column */}
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission) => (
                        <tr key={submission.submission._id}>
                            {console.log(submission.submission._id)}
                            <td style={styles.tableCell}>
                                {submission.student.firstname} {submission.student.lastname}
                            </td>
                            <td style={styles.tableCell}>files</td>
                            <td style={styles.tableCell}>
                                <input
                                    type="number"
                                    value={submission.submission.obtainedmarks || ''}
                                    onChange={(e) => {
                                        const updatedSubmissions = [...submissions];
                                        const index = updatedSubmissions.findIndex((s) => s.submission._id === submission.submission._id);
                                        console.log("index is ", index);
                                        updatedSubmissions[index].submission.obtainedmarks = e.target.value;
                                        setSubmissions(updatedSubmissions);
                                    }}
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.tableCell}>
                                <div>
                                    <FormControl style={{ width: '100px' }}>

                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={submission.submission.weaktags || []}
                                            onChange={(e) => {
                                                const updatedSubmissions = [...submissions];
                                                const index = updatedSubmissions.findIndex((s) => s.submission._id === submission.submission._id);
                                                const { value } = e.target;
                                                updatedSubmissions[index].submission.weaktags = e.target.value;
                                                setWeakTags(e.target.value);
                                                setSubmissions(updatedSubmissions);
                                            }}
                                            sx={{
                                                height: '35px',
                                                width: '100px'
                                            }}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => {
                                                if (Array.isArray(selected)) {
                                                    return selected.join(', ');
                                                }
                                                return '';
                                            }}
                                        >
                                            {tags.map((tag) => (
                                                <MenuItem key={tag} value={tag}
                                                    sx={{
                                                        width: 'auto',
                                                        padding: '5px',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                    <Checkbox checked={weakTags.indexOf(tag) > -1}
                                                        sx={{
                                                            margin: '0px',
                                                            padding: '0px'
                                                        }} />
                                                    <ListItemText primary={tag}
                                                        sx={{

                                                            margin: '0px',
                                                            padding: '1px'
                                                        }} />
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button variant="contained" onClick={handleSave} style={styles.saveButton}>
                Save
            </Button>
        </div>
    );

};

const styles = {
    tableHeader: {
        background: '#1e3c72',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    },
    tableCell: {
        padding: '5px',
        borderBottom: '1px solid #ddd',
    },
    input: {
        width: '60px',
    },
    saveButton: {
        backgroundColor: '#1e3c72',
        color: 'white',
        borderRadius: '10px',
        padding: '10px 30px',
        fontSize: '1rem',
        marginTop: '20px',
    },
};

export default SubmissionsDisplay;
