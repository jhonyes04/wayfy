import React from 'react';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import useTooltip from '../../hooks/useTooltip'

const ACCESSIBILITY_FILTERS = [
    {
        value: 'yes',
        label: 'Total',
        color: 'success',
        faIcon: 'fa-solid fa-wheelchair',
    },
    {
        value: 'limited',
        label: 'Parcial',
        color: 'warning',
        faIcon: 'fa-solid fa-triangle-exclamation',
    },
    { value: 'no', label: 'No', color: 'danger', faIcon: 'fa-solid fa-ban' },
    {
        value: 'unknown',
        label: '?',
        color: 'secondary',
        faIcon: 'fa-solid fa-circle-question',
    },
];

export const FilterAccessibility = () => {
    const { store, dispatch } = useGlobalReducer();
    const { activeFilters = [] } = store;

    const toggle = (value) => {
        const newValues = activeFilters.includes(value)
            ? activeFilters.length > 1
                ? activeFilters.filter((v) => v !== value)
                : activeFilters
            : [...activeFilters, value];

        dispatch({ type: 'SET_ACTIVE_FILTERS', payload: newValues });
    };

    return (
        <section>
            <h6 className="text-light m-0">Accesibilidad</h6>

            <div className="row g-1">
                {ACCESSIBILITY_FILTERS.map((f) => {
                    const isActive = activeFilters.includes(f.value);

                    const tooltipRef = useTooltip({
                        title: f.label,
                        placement: 'bottom',
                        trigger: 'hover'
                    })

                    return (
                        <div
                            ref={tooltipRef}
                            key={f.value}
                            className='col flex-wrap'
                        >
                            <button
                                onClick={() => toggle(f.value)}
                                className={`btn btn-sm w-100 d-flex flex-column align-items-center py-2 border-2 rounded-2 ${isActive
                                    ? `btn-${f.color} border-${f.color} text-primary fw-bold shadow-sm`
                                    : 'btn-light border-light-subtle text-muted fw-bold opacity-50'
                                    }`}
                            >
                                <i
                                    className={`fa-solid ${f.faIcon} ${isActive ? 'text-white' : 'text-muted'
                                        }`}
                                ></i>
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
