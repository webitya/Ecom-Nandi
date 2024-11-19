'use client';

import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const BookPanditButton = () => {
 
    const [expanded, setExpanded] = useState(false);

    const navigation= useNavigate();

    const handleNavigation = () => {
        navigation('/bookpandit');
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (expanded) {
            setTimeout(() => {
                setExpanded(false)
            }, 2000)
        }
    }, [expanded])
    return (
        <div className="fixed bottom-4 sm:bottom-4 right-4 sm:right-4 cursor-pointer transition-transform duration-300 ease-in-out">
            <button
                type="button"
                onClick={handleNavigation}
                className={`flex items-center justify-center transition-all duration-500 ease-in-out p-2 rounded-full shadow-lg ${expanded ? 'w-48' : 'w-14'} ${expanded ? 'pl-4 pr-6' : 'pl-2 pr-2'} bg-orange-500 text-white hover:bg-orange-600 transform ${expanded ? 'scale-105' : 'scale-100'}`}
                style={{
                    fontWeight: 'bold',
                    border: 'none',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                }}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                <RightOutlined onClick={() => setExpanded(false)} className="text-white transition-transform duration-500" />
                {expanded && (
                    <span className="ml-2 text-sm whitespace-nowrap  transition-opacity duration-300 opacity-100">
                        Book Your Pandit Now
                    </span>
                )}
            </button>
        </div>
    );
};
