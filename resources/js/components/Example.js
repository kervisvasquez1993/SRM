import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

function Example() {
    const handleToast = () => {
        toast("✔️ La notificación funciona");
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">
                            I'm an example component!
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleToast}
                        >
                            Test Toast
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <MyComponent />
            </div>
        </div>
    );
}

function MyComponent() {
    const [value, setValue] = useState(`<p><strong>Hola!!</strong>!!!!!!!!!!!       <a href="https://codepen.io/alexkrolick/pen/xgyOXQ" rel="noopener noreferrer" target="_blank">Link</a></p><p><br></p><p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada, arcu vel consequat fringilla, turpis velit vestibulum ligula, eget dictum ex mauris a metus. In sed sagittis est. Quisque semper commodo dui in fringilla. Vivamus rutrum nulla mi, et rutrum sapien tempor sed. Sed ac mi a diam bibendum rutrum eget a dui. Phasellus cursus sagittis sapien ut congue. Vestibulum imperdiet luctus mattis. Morbi dictum, est et vehicula porttitor, diam felis ornare ex, ut eleifend nulla erat nec nunc. Donec pellentesque ut mauris ac finibus.</p><p class="ql-align-justify">Sed varius, libero at luctus faucibus, eros ante lacinia tortor, et lacinia magna tellus id quam. Aliquam vel tincidunt massa, a viverra risus. Morbi molestie tortor vitae orci vulputate vulputate. Quisque in enim non dolor scelerisque tincidunt quis sit amet massa. Sed malesuada ex ut posuere ultricies. Phasellus id sodales quam. Nam a pellentesque ex. Aliquam erat volutpat. Morbi et condimentum est. Praesent ac ex quis augue finibus vestibulum.</p><p class="ql-align-justify">Curabitur felis felis, dapibus eu iaculis vel, tempus et nisi. Praesent eleifend non orci et malesuada. Fusce tempus nibh eu magna rhoncus aliquet. Nunc aliquet massa ut elit tincidunt, ut venenatis ligula aliquam. Pellentesque euismod ultricies arcu, eget iaculis lorem tempus vel. Sed rutrum risus fermentum mollis eleifend. Curabitur molestie dui ac pellentesque suscipit. Sed mattis augue in semper facilisis. Nunc tortor tortor, cursus dignissim est eu, cursus lacinia arcu. Vivamus vehicula velit nec molestie tincidunt. Etiam sagittis, tellus vel pellentesque tincidunt, enim tortor pretium ex, ac posuere lacus sapien et lorem.</p><p class="ql-align-justify">Etiam vitae facilisis lorem. Suspendisse ac fermentum diam. Curabitur luctus turpis vitae rutrum ullamcorper. Etiam vitae tortor in est congue lacinia vel eu leo. Duis vitae ex in urna tristique tristique sed quis enim. Morbi ut libero urna. In libero odio, tincidunt ac mattis nec, ornare id elit. Nam eleifend maximus quam, et scelerisque lorem dapibus non.</p><p class="ql-align-justify">Nulla vel massa ut elit sodales accumsan. Mauris id venenatis ex. Mauris convallis dolor a metus facilisis, nec congue urna posuere. Fusce a arcu tellus. Proin a purus nisl. Fusce ac tellus posuere, malesuada augue vitae, ornare lorem. Nunc tellus risus, ultricies sed lectus id, tincidunt ultrices arcu. Mauris elementum sem non diam elementum, eget porta sapien consectetur. Praesent imperdiet, mi eget hendrerit imperdiet, elit ante consequat dolor, euismod vehicula enim enim ut odio. Vestibulum consequat justo vitae imperdiet bibendum. Proin at ligula risus. Nunc mollis ut massa molestie tempus. Sed id ultrices arcu. Morbi eget fringilla ante.</p><p><br></p>`);

    console.log(value)

    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default Example;
