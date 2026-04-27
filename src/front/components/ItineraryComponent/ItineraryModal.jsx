import { useEffect } from "react";
import { CategorySelector } from "./CategorySelector";

export const ItineraryModal = ({
    show,
    onClose,
    onSubmit,
    inputs,
    setInputs,
    isEditing
}) => {

    // Evitar scroll del body cuando el modal está abierto
    useEffect(() => {
        if (show) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [show]);

    return (
        <>
            {/* BACKDROP CONTROLADO POR REACT */}
            {show && <div className="modal-backdrop fade show"></div>}

            <div
                className={`modal fade ${show ? "show d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
                aria-modal={show ? "true" : undefined}
            >
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={onSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title text-primary">
                                {isEditing ? "Editar evento" : "Nuevo evento"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label fw-bold">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={inputs.title}
                                    onChange={(e) =>
                                        setInputs({ ...inputs, title: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="d-flex gap-1">
                                <div className="col-12 col-md-4 mb-3">
                                    <label className="form-label fw-bold">Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={inputs.date}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, date: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <label className="form-label fw-bold">Hora inicio</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        step="900"
                                        value={inputs.startTime}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, startTime: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <label className="form-label fw-bold">Hora fin</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        step="900"
                                        value={inputs.endTime}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, endTime: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <CategorySelector
                                    value={inputs.category}
                                    onChange={(cat) =>
                                        setInputs({ ...inputs, category: cat })
                                    }
                                />
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
