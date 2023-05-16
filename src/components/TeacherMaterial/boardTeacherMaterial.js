//this component shows all the cards of the materials
//to call send props: userID, classID, weekId, weekNumber, topicId, topicMaterials
//when a card will be clicked a new router will lead to viewTeacher Material


import React, { useState } from 'react';
import TeacherMaterialCard from './TeacherMaterialCard';

function boardTeacherMaterial(props) {
    const { userID, classID, weekId, weekNumber, topicId, topicMaterials } = props;//all these should be received while calling this component



    const cards = [];
    for (let i = 1; i <= numberWeeks; i++) {
        cards.push(
            <TeacherMaterialCard
                key={i}
                weekNumber={i}
                weekInfo={weeksInfo[i]}
                onWeekSelect={() => onWeekSelect(i - 1)}
            />
        );
    }

    return (
        <div>
            <div style={{ gap: '16px', justifyContent: 'center', alignItems: 'center', paddingLeft: '20%' }}>
                {topicMaterials.map((material, index) => (
                    <TopicCard
                        key={index}
                        id={material._id}
                        title={topic.name}
                        onViewTopic={handleViewTopic}
                        onDeleteTopic={HandleDeleteTopic}
                        userId={props.userId}
                        classId={props.classId}
                        weekId={props.weekId}
                        weekNumber={props.weekNumber}
                        cardKey={topic.id}
                    />))}
            </div>
            {/*{showAddForm && <AddTopic addToTopics={addTopic} topics={weeksInfo[currWeekNumber].topics} />}*/}
        </div>
    );
}

export default CloDetails;
