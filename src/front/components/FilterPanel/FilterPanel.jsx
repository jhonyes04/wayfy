import React from 'react';
import { FilterAccessibility } from './FilterAccessibility';
import { FilterCategories } from './FilterCategories';

export const FilterPanel = () => {

    return (
        <div
            className="d-flex rounded-3 gap-4 p-2"
            style={{ background: 'rgba(0, 0, 0, 0.6)' }}
        >
            <FilterAccessibility />
            <FilterCategories />
        </div>
    );
};
