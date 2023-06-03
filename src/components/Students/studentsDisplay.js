import React, { useState, useEffect } from 'react';

const StudentsDisplay = (props) => {

    const [students, setStudents] = useState([]);



    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:4000/backend/class/${props.classId}/students`);
                const data = await response.json();
                setStudents(data);
                console.log("students fetched: ", data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleStudentClick = (studentId) => {
        console.log(studentId, " clicked!")
    }



    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <table>
                <thead >
                    <tr >
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td style={styles.tableCell}><span
                                style={{ cursor: 'pointer', color: 'black' }}
                                onClick={() => handleStudentClick(student._id)}
                            >
                                {student.firstname}
                            </span></td>
                            <td style={styles.tableCell}>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const styles = {
    tableHeader: {
        background: '#1e3c72',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontFamily: 'Montserrat',
        width: '20%'
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        width: '20%'
    }
};
export default StudentsDisplay;
