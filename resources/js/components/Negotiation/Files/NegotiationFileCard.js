import React from "react";
import { AiFillFile } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import { ImFileText2 } from "react-icons/im";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "../../../store/actions/negotiationActions";
import LoadingSpinner from "../../Navigation/LoadingSpinner";
import { confirmDelete } from "../../../appText";

const NegotiationFileCard = ({ data }) => {
    const { id, name, dummy, url } = data;

    const dispatch = useDispatch();
    const deletingFileId = useSelector(
        // @ts-ignore
        state => state.negotiation.deletingFileId
    );

    const handleClick = () => {};

    const handleDelete = e => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(confirmDelete)) {
            dispatch(deleteFile(id));
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
        content = <img src={url} />;
    } else if (extension === "pdf") {
        content = <VscFilePdf />;
    } else if (extension === "txt") {
        content = <ImFileText2 />;
    } else if (extension === "xlsx") {
        content = <SiMicrosoftexcel />;
    }

    return (
        <a href={url}>
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

export default NegotiationFileCard;
