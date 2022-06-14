import { Suspense } from 'react';
import React from 'react';
import { Text } from 'react-native';

const Home = React.lazy(() => import('./HomeScreen'));

const SuspenseEX = () => {
    return(
        <Suspense fallback={<Text>Loading...</Text>}>
            <Home/>
        </Suspense>
    );
};

export default SuspenseEX;