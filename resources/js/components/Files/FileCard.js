import React from "react";
import { AiFillFile } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import { ImFileText2 } from "react-icons/im";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Navigation/LoadingSpinner";
import { confirmDelete } from "../../appText";
import { deleteFile } from "../../store/actions/fileManagerActions";

const FileCard = ({
    data,
    stateName,
    deleteAction = null,
    deleteUrl = null,
    managerId = null
}) => {
    const { id, name, dummy, url } = data;
    const link = `https://srmdnamics-laravel-file.s3.us-east-2.amazonaws.com/${url}`;

    const dispatch = useDispatch();
    const deletingFileId = useSelector(
        state => state[stateName].deletingFileId
    );

    const handleDelete = e => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(confirmDelete)) {
            if (deleteAction) {
                dispatch(deleteAction());
            } else {
                dispatch(deleteFile(managerId, data.id, deleteUrl));
            }
        }
    };

    const extension = name.substr(name.lastIndexOf(".") + 1);
    let content = <AiFillFile />;

    if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpge" ||
        extension === "gif"
    ) {
        content = <img src={link} />;
    } else if (extension === "pdf") {
        content = <VscFilePdf />;
    } else if (extension === "txt") {
        content = <ImFileText2 />;
    } else if (extension === "xlsx") {
        content = <SiMicrosoftexcel />;
    }

    return (
        <a href={link} target="_blank" download={name}>
            <div className="file-card mb-2 mr-2">
                <div className="preview">
                    {dummy ? (
                        <LoadingSpinner />
                    ) : deletingFileId === id ? (
                        <LoadingSpinner />
                    ) : (
                        <React.Fragment>
                            {content}
                            <MdDeleteForever
                                className="delete-icon"
                                onClick={handleDelete}
                            />
                        </React.Fragment>
                    )}
                </div>

                <div className="footer">{name}</div>
            </div>
        </a>
    );
};

export default FileCard;
