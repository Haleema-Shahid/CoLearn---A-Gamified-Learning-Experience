import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

const SubmissionsDisplay = () => {
    const { userId, assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`http://localhost:4000/backend/t/${userId}/assignment/${assignmentId}/submissions`);
                const data = await response.json();
                console.log(data);
                setSubmissions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);

    const handleSave = () => {
        console.log("save clicked");
        console.log(submissions);

        const updatedSubmissions = [];

        for (let i = 0; i < submissions.length; i++) {
            const submission = submissions[i];
            const updatedSubmission = {
                _id: submission.submission._id,
                obtainedmarks: submission.submission.obtainedmarks,
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
    };

    return (
        // <h2>hello jee</h2>

        <div>
            <h2>Submissions</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Student Name</th>
                        <th style={styles.tableHeader}>Submission</th>
                        <th style={styles.tableHeader}>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission) => (
                        <tr key={submission.submission._id}>
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
                                        const index = updatedSubmissions.findIndex((s) => s._id === submission._id);
                                        updatedSubmissions[index].submission.obtainedmarks = e.target.value;
                                        setSubmissions(updatedSubmissions);
                                    }}
                                    style={styles.input}
                                />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button
                variant="contained"
                onClick={handleSave}
                style={styles.saveButton}
            >
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
        padding: '10px',
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
