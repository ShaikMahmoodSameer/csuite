import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from './TabPanel';

export default function MeetingSessionsTabs({ mtngTbl }) {
  const [activeSession, setActiveSession] = React.useState(0);

  const handleChange = (event, newValue) => { setActiveSession(newValue) };
  const handleChangeIndex = (index) => { setActiveSession(index) };

  const meetingSessions = ["11:00am - 11:30am", "11:30am - 12:00am", "12:00pm - 12:30pm", "12:30pm - 01:00pm", "01:00pm - 01:30pm", "01:30pm - 02:00pm", "02:00pm - 02:30pm", "02:30pm - 03:00pm", "03:00pm - 03:30pm", "03:30pm - 04:00pm", "04:00pm - 04:30pm", "04:30pm - 05:00pm", "05:00pm - 05:30pm", "05:30pm - 06:00pm"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs
        value={activeSession}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        className='border-top border-bottom'
      >
        {meetingSessions.map((item, idx) => ( 
          <Tab key={idx} label={item} />
        ))}
      </Tabs>
      <SwipeableViews index={activeSession} onChangeIndex={handleChangeIndex}>
        {meetingSessions.map((item, idx) => (
          <TabPanel key={idx} activeSession={activeSession} mtngTbl={mtngTbl} index={idx} session={item} />
        ))}
      </SwipeableViews>
    </Box>
  );
}
