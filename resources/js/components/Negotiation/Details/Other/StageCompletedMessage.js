const React = require("react");
const { FaCheck } = require("react-icons/fa");

const StageCompletedMessage = () => {
    return (
        <p>
            <FaCheck className="mr-2 icon-normal" /> Etapa completada
        </p>
    );
};

export default StageCompletedMessage;
