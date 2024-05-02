
import React from 'react';
import LoadingLink from '../common/LoadingLink';
import { useLocation } from 'react-router';

const TitleHeader = ({ title ='', link1, link2 }) => {
    const location = useLocation();

    const formattedTitle = location?.pathname?.replace('/', '').split('-').map(word => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()).join(' ');
    const formattedLink1 = link1?.split('-').map(word => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()).join(' ');
    const formattedLink2 = link2?.split('-').map(word => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()).join(' ');

    return (
        <div className="flex sm:flex-row flex-col sm:gap-2 justify-between sm:items-center ">
            <span className="text-2xl font-bold">{location?.pathname === '/' ? 'Dashboard' :  title}</span>
            <div className='flex flex-row gap-1'>
                {location?.pathname === '/' ? null : link1 && <LoadingLink href={'/' + (link1 === 'dashboard' ? '' : link1)} className="text-sm  ">{formattedLink1}</LoadingLink>}
                {link2 && <LoadingLink href={'/' + link2} className="text-sm ">/ {formattedLink2}</LoadingLink>}
            </div>
        </div>
    );
}

export default TitleHeader;