import { Suspense } from 'react';
import React from 'react';
import { Text } from 'react-native';

const Home = React.lazy(() => import('./LoginScreen'));

const SuspenseEX2 = () => {
    return(
        <Suspense fallback={<Text>Loading...</Text>}>
            <Home/>
        </Suspense>
    );
};

export default SuspenseEX2;