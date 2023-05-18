//this is going to show all the assignment and material posted for a topic
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

function ViewTopic({ title, description, materials, assignments }) {
  console.log(title)
  console.log(assignments)

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <h3>Materials</h3>
      {materials.map((material) => (
        <Accordion>
          <AccordionSummary>{material.title}</AccordionSummary>
          <AccordionDetails>
            <p>{material.description}</p>
          </AccordionDetails>
        </Accordion>
      ))}
      <h3>Assignments</h3>
      {assignments.map((assignment) => (
        <Accordion>
          <AccordionSummary>{assignment.title}</AccordionSummary>
          <AccordionDetails>
            <p>{assignment.description}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ViewTopic;
