import React, { useState } from 'react';
import { FilterAccessibility } from './FilterAccessibility';
import { FilterCategories } from './FilterCategories';
import './css/FilterPanel.css';

export const FilterPanel = () => {
    const [show, setShow] = useState(true);

    const toggle = () => setShow(prev => !prev);

    return (
        <>
            <div
                className={`
                    position-absolute end-0 ms-5
                    ${show ? 'filter-open' : 'filter-closed'} z-1`}
                style={{
                    top: '5px'
                }}
            >
                <div
                    className="d-flex gap-4 p-2 rounded-3"
                    style={{
                        background: 'rgba(0,0,0,0.6)',
                        pointerEvents: 'auto', // el contenido sí recibe clics
                    }}
                >
                    <FilterAccessibility />
                    <FilterCategories />
                </div>
            </div>

            {/* BOTÓN FLOTANTE */}
            <button
                className="btn btn-sm btn-primary position-absolute end-0 rounded-start-pill shadow-sm d-flex align-items-center justify-content-center z-3"
                style={{
                    // top: '5px',
                    transition: 'right 0.35s ease'
                }}
                onClick={toggle}
            >
                {show ? '❯' : '❮'}
            </button>
        </>
    );
};
