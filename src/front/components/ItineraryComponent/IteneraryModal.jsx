import React, { useState } from 'react'
import useGlobalReducer from '../../hooks/useGlobalReducer';

export const IteneraryModal = ({ handleAddEdit }) => {
    const { store } = useGlobalReducer()
    const [events, setEvents] = useState([]);
    const [text, setText] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const filteredPlaces = store.places.filter(place =>
        place.name.toLowerCase().includes(text.toLowerCase())
    );


    return (
        <div className="modal fade" id="itineraryModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Agregar actividad</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">s

                        <form onSubmit={handleAddEdit}>


                            <div className="mb-3 position-relative">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Actividad"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />

                                {text && (
                                    <ul className="list-group position-absolute w-100 shadow">
                                        {filteredPlaces.map(place => (
                                            <li
                                                key={place.id}
                                                className="list-group-item list-group-item-action"
                                                onClick={() => setText(place.name)}
                                            >
                                                📍 {place.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <input
                                type="date"
                                className="form-control mb-3"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />



                            <div className="row mb-3">
                                <div className="col">
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>

                                <div className="col">
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="d-grid">
                                <button type="submit" className="btn btn-success">
                                    Agregar actividad
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
