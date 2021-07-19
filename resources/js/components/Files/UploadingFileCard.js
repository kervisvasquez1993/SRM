import React from "react";
import LoadingSpinner from "../Navigation/LoadingSpinner";

const UploadingFileCard = ({ data }) => {
    return (
        <div className="file-card mb-2 mr-2">
            <div className="preview">
                <LoadingSpinner />
            </div>

            <div className="footer">{data.name}</div>
        </div>
    );
};

export default UploadingFileCard;
