import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CLOstarter from '../CLO/CLOstarter'
import { useState } from 'react';

export default function TeacherClassTabs(props) {
  const [value, setValue] = React.useState('2');
  const [userId, setUserId] = useState(props.userId);
  const [classId, setClassId] = useState(props.classId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabContent = (tabValue) => {
    switch (tabValue) {
      case '1':
        return 'Item One'; //in class tab we can show leader board and class report for everyone to see
      case '2':
        return <CLOstarter userId={userId} classId={classId} />;
      case '3':
        return 'Item Three';//in students tab we can show the teacher and students 
      default:
        return null;
    }
  };

  const tabContent = getTabContent(value);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Class" value="1" />
            <Tab label="Week Outline" value="2" />
            <Tab label="Students" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">{getTabContent('1')}</TabPanel>
        <TabPanel value="2">{getTabContent('2')}</TabPanel>
        <TabPanel value="3">{getTabContent('3')}</TabPanel>
      </TabContext>
    </Box>
  );
}