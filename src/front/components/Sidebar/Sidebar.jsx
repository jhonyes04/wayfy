import React from 'react';
import './css/Sidebar.css'

export const Sidebar = ({ show, toggle, children }) => {
    return (
        <>
            {/* SIDEBAR */}
            <aside
                className={`sidebar
                    position-absolute top-0 end-0 h-100 d-flex flex-column  ${show ? 'sidebar-open' : 'sidebar-closed'} z-1`}
            >
                <div className="flex-grow-1 overflow-auto">
                    {children}
                </div>
            </aside>

            <button
                className="btn btn-sm btn-primary position-absolute top-0 end-0 rounded-start-pill shadow-sm d-flex align-items-center justify-content-center z-1"
                style={{
                    // right: show ? '0' : '0px',
                    transition: 'right 0.35s ease'
                }}
                onClick={toggle}
            >
                {show ? '❯' : '❮'}
            </button>
        </>
    );
};
