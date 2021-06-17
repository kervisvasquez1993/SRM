import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

const EditableInput = ({ id, data, setData, isTableCell = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    //const inputRef = useRef(null);

    const inputRef = useCallback(node => {
        if (node !== null) {
            node.focus();
        }
    }, []);

    const handleClick = (e) => {
        console.log("click", e.target)
        if (!isEditing) { 
            setIsEditing(true);
        }
    };

    const handleSubmit = e => {
        console.log(e.target)
        e.preventDefault();
        setIsEditing(false);
    };

    const handleChange = e => {
        const newData = { ...data, [e.target.id]: e.target.value };
        setData(newData);
    };

    return (
        <React.Fragment>
            {isTableCell ? (
                <td onClick={handleClick}>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <input
                                onBlur={handleSubmit}
                                type="text"
                                ref={inputRef}
                                value={data[id]}
                                id={id}
                                onChange={handleChange}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </form>
                    ) : (
                        data[id]
                    )}
                </td>
            ) : isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        onBlur={handleSubmit}
                        type="text"
                        ref={inputRef}
                        value={data[id]}
                        id={id}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />
                </form>
            ) : (
                <div onClick={handleClick}>{data[id]}</div>
            )}
        </React.Fragment>
    );
};

export default EditableInput;
