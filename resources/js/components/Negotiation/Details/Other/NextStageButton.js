const React = require("react");
const { FaCheck } = require("react-icons/fa");

const NextStageButton = props => {
    return (
        <button
            className="btn btn-info btn-lg"
            {...props}
        >
            <FaCheck className="mr-2 icon-normal" />
            Completar
        </button>
    );
};

export default NextStageButton;