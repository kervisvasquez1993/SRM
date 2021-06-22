import React from "react";
import { Gestures } from "react-gesture-handler";
import { useDispatch } from "react-redux";
import {
    sidebarPanLeft,
    sidebarPanRight
} from "../../store/actions/sidebarActions";

const SidebarTouchBorder = () => {
    const dispatch = useDispatch();

    const handleGesture = event => {
        if (event.type === "panleft") {
            dispatch(sidebarPanLeft());
        }

        if (event.type === "panright") {
            dispatch(sidebarPanRight());
        }
    };

    return (
        <Gestures
            recognizers={{
                Pan: {
                    events: {
                        panleft: handleGesture,
                        panright: handleGesture,
                        panup: handleGesture,
                        pandown: handleGesture
                    }
                }
            }}
        >
            <div className="sidebar-touch-border"></div>
        </Gestures>
    );
};

export default SidebarTouchBorder;
