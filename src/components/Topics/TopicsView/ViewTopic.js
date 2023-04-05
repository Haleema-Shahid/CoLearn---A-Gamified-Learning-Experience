//this is going to show all the assignment and material posted for a topic
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

function ViewTopic({title, description, materials, assignments}) {
  console.log(title)
  console.log(assignments)
    // const title="Arrays";
    // const description="something on arrays";
    // const materials = [
    //     {
    //       id: 1,
    //       title: "Material 1",
    //       description: "This is the description of Material 1.",
    //       files: ["file1.pdf", "file2.docx"],
    //       creationDate: "2022-03-01",
    //     },
    //     {
    //       id: 2,
    //       title: "Material 2",
    //       description: "This is the description of Material 2.",
    //       files: ["file1.pdf"],
    //       creationDate: "2022-03-02",
    //     },
    //   ];
    
    //   const assignments = [
    //     {
    //       id: 1,
    //       title: "Assignment 1",
    //       description: "This is the description of Assignment 1.",
    //       files: ["file1.pdf", "file2.docx"],
    //       deadline: "2022-03-15",
    //       tags: ["tag1", "tag2"],
    //     },
    //     {
    //       id: 2,
    //       title: "Assignment 2",
    //       description: "This is the description of Assignment 2.",
    //       files: ["file1.pdf"],
    //       deadline: "2022-03-20",
    //       tags: ["tag1"],
    //     },
    //   ];

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
