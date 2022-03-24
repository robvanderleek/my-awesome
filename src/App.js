import './App.css';
import {styled} from "@mui/material";

import {Fragment, useEffect, useState} from "react";
import {apiGet} from "./utils";

const AvatarImg = styled('img')({
    width: 256,
    height: 256,
    borderRadius: '50%',
    border: '1px solid #303030'
});

function App() {
    const [avatarUrl, setAvatarUrl] = useState(undefined);
    const [markdown, setMarkdown] = useState('');
    useEffect(() => {
        const getAvatarUrl = async () => {
            setAvatarUrl(await apiGet('/user/robvanderleek/avatar_url'));
            setMarkdown(await apiGet('/user/robvanderleek/my-awesome'));
        };
        getAvatarUrl();
    }, [])

    return (
        <Fragment>
            <AvatarImg alt="Avatar" src={avatarUrl}/>
            {markdown}
        </Fragment>
    );
}

export default App;
