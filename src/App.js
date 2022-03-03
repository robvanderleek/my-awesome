import './App.css';
import {Avatar, Tooltip} from "@mui/material";
import intellijLogo from './IntelliJ_IDEA_Icon.svg'
import slackLogo from './slack-new-logo.svg'

import {Fragment} from "react";

function App() {
    return (
        <Fragment>
            <Tooltip title="IntelliJ">
                <Avatar src={intellijLogo} sx={{width: 64, height: 64}}/>
            </Tooltip>
            <Tooltip title="Slack">
                <Avatar src={slackLogo} sx={{width: 64, height: 64}}/>
            </Tooltip>
        </Fragment>
    );
}

export default App;
