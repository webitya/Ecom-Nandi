import { PlusOutlined } from "@ant-design/icons";

const UplaodBtnEl = ({ name }) => {
    return (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload <span className="sm:hidden inline">{name}</span></div>
        </button>
    );
}

export default UplaodBtnEl;