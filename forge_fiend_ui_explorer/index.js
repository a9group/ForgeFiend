import ForgeUI, { render, Fragment, Text, Button, useState, ModalDialog, useEffect, GlobalPage } from '@forge/ui';
import api, { route } from '@forge/api';

const fetchUserDetails = async () => {
    const res = await api.asUser().requestJira(route`/rest/api/3/myself`);
    return await res.json();
};

const App = () => {
    const [isOpen, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(async () => {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
    }, []);

    return (
        <Fragment>
            <Text>Welcome to Forge Fiend UI Explorer! Click below to learn about Jira UI elements.</Text>
            <Button text="Explore Jira UI" onClick={() => setOpen(true)} />
            {isOpen && (
                <ModalDialog header="Jira UI Elements" onClose={() => setOpen(false)}>
                    <Text>- **Global Pages**: Custom pages for app navigation.</Text>
                    <Text>- **Issue Panels**: Extend Jira issues with extra context.</Text>
                    <Text>- **Project Pages**: Dedicated pages for project-specific insights.</Text>
                    <Text>- **Custom Fields**: Store structured data inside Jira issues.</Text>
                    <Text>User: {user ? user.displayName : 'Loading...'}</Text>
                </ModalDialog>
            )}
        </Fragment>
    );
};

export const run = render(<GlobalPage><App /></GlobalPage>);
