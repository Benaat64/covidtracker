import React from 'react';
import CardCategories from './CardCategories';

const Monde = ({covid}) => {
    if (!covid) {
        return <div>Loading...</div>;
    }
    return (
        <div className='flex justify-center'>
            <CardCategories covid={covid} />
        </div>
    );
};

export default Monde;