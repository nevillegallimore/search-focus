// import external dependencies
import { useState } from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////

export const useOptions = () => {
    const [options] = useState([
        'Abu Dhabi',
        'Amsterdam',
        'Ankara',
        'Baku',
        'Berlin',
        'Bratislava',
        'Cairo',
        'Cancun',
        'Cape City',
        'Cape Town',
        'Doha',
        'Dublin',
        'Gibraltar',
        'Hanoi',
        'Havana',
        'Jakarta',
        'Kabul',
        'Kingston',
        'Kuala Lumpur',
        'Kyiv',
    ]);

    return options;
};
