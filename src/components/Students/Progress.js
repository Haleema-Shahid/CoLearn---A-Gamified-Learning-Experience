import React from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import AllAssignmentsAnalyticsChart from '../../Charts/AllAssignmentsAnalyticsChart';
import SingleAssignmentAnalyticsChart from '../../Charts/SingleAssignmentAnalyticsChart';
import LineChart01 from '../../Charts/LineChart01';
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

function ProgressDashboard(props) {
    // Sample data for the assignment analytics chart
    const assignmentData = [
        {
            label: 'Assignment 1',
            mean: 85,
            maximum: 95,
            minimum: 75,
        },
        {
            label: 'Assignment 2',
            mean: 92,
            maximum: 98,
            minimum: 87,
        },
        {
            label: 'Assignment 3',
            mean: 78,
            maximum: 85,
            minimum: 72,
        },
    ];

    // Sample data for the assignment analytics chart
    const assignmentData2 = {
        title: 'Assignment 1',
        totalMarks: 100,
        studentData: [
            { range: '0-25', count: 5 },
            { range: '26-50', count: 10 },
            { range: '51-75', count: 8 },
            { range: '76-100', count: 15 },
        ],
    };

    // Sample data for line chart
    const lineChartData = {
        labels: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
        scores: [80, 65, 90],
    };

    return (
        <div className="flex flex-col">
            <header className="px-5 py-4 border-b border-slate-100" style={{ marginLeft: '45%', paddingTop: '5%', fontFamily: 'Montserrat' }}>
                <span className="analytics" style={{ color: 'rgb(30, 41, 59)', fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: 700, marginRight: '0.5rem', pointerEvents: 'none' }}>Analytics</span>
            </header>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: '2%',
                paddingLeft: '7%',
                paddingRight: '7%',
                justifyContent: 'space-between',
            }}>
                <div className="chart-container">
                    <LineChart01
                        data={lineChartData}
                        width={595}
                        height={248}
                    />
                </div>

                <div className="class-position">
                    {/* Show student's class position here */}
                    <div className="position-number">
                        <span style={{ color: '#082c73', fontSize: '8rem', fontWeight: 'bold' }}>5</span>
                        <span className="suffix">th</span>
                    </div>
                    <h3>5th out of 30 students</h3>
                    {/* <p>Your current position in class: 5 out of 30 students</p> */}
                    <span style={{ fontSize: '3rem' }} role="img" aria-label="emoji">😊</span>
                </div>

                <style jsx>{`
                    .chart-container {
                        display: inline-block;
                        margin: 1rem;
                    }

                    .class-position {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 1rem;
                        padding: 1rem;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        width: 250px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }

                    .position-number {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    }

                    .suffix {
                        position: relative;
                        top: -42px;
                        right: 0;
                        font-size: 1.5rem;
                        color: blue;
                    }
                `}</style>




            </div>
        </div>
    );
}

export default ProgressDashboard;
