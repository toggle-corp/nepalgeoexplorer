import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { _cs } from '@togglecorp/fujs';

import Navbar from '#components/Navbar';
import Haze from '#components/Haze';
import routes from './routes';

import styles from './styles.css';

interface TitleProps {
    value: string;
}
const Title = ({ value }: TitleProps) => {
    useEffect(
        () => {
            document.title = value;
        },
        [value],
    );
    return null;
};

interface LoadingProps {
    message: string;
}
const Loading = ({ message }: LoadingProps) => (
    <div className={styles.loading}>
        {message}
    </div>
);

interface Props {
    className?: string;
}
const Multiplexer = (props: Props) => {
    const { className } = props;

    return (
        <>
            <div className={_cs(className, styles.multiplexer)}>
                <Suspense
                    fallback={(
                        <Loading message="Please wait..." />
                    )}
                >
                    <Switch>
                        {routes.map((route) => {
                            const {
                                path,
                                name,
                                title,
                                hideNavbar,
                                load: Loader,
                            } = route;
                            return (
                                <Route
                                    exact
                                    className={styles.route}
                                    key={name}
                                    path={path}
                                    render={() => (
                                        <>
                                            { !hideNavbar && (
                                                <Navbar className={styles.navbar} />
                                            )}
                                            <Loader className={styles.view} />
                                        </>
                                    )}
                                />
                            );
                        })}
                    </Switch>
                </Suspense>
            </div>
            <div className={styles.warning}>
                <h1>Simana</h1>
                <p>Please change your orientation to landscape.</p>
            </div>
        </>
    );
};

export default Multiplexer;
