import useGlobalReducer from '../../hooks/useGlobalReducer';

export const PlacesList = () => {
    const { store, dispatch } = useGlobalReducer();
    const { places } = store;

    const handleClickDelete = (placeId) => {
        dispatch({
            type: 'REMOVE_PLACE',
            payload: placeId,
        });
    };

    if (places.length === 0) return null;

    return (
        <div className='my-3'>
            <h6 className='text-primary'>Marcadores</h6>

            {places.map((place) => (
                <div
                    key={place.id}
                    className="card mb-2 p-2 shadow-sm"
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <span>{place.name}</span>

                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleClickDelete(place.id)}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
