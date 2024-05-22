
import React from 'react';
import LoadingLink from '../common/LoadingLink';
import { useLocation } from 'react-router';

const TitleHeader = ({ title = '', link1, link2 }) => {
    const location = useLocation();

    const formattedTitle = location?.pathname?.replace('/', '').split('-').map(word => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()).join(' ');
    const formattedLink1 = link1?.split('-').map(word => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()).join(' ');
    const formattedLink2 = link2?.split('-').map(word => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()).join(' ');

    return (
        <div className="flex flex-col gap-2 ">
            <div className='flex flex-row gap-1 items-center'>
                {location?.pathname === '/' ? null : link1 && <LoadingLink href={'/' + (link1 === 'dashboard' ? '' : link1)} className="sm:text-sm text-xs ">{formattedLink1}</LoadingLink>}
                {link2 && <span className="sm:text-sm text-xs ">/</span>}
                {link2 && <span className="sm:text-sm text-xs text-[#0185FF]">{formattedLink2}</span>}
            </div>
            <span className="md:text-3xl  text-xl font-bold">{location?.pathname === '/' ? 'Dashboard' : title}</span>
        </div>
    );
}

export default TitleHeader;