import React, { useRef } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const RichTextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  const config = {
    buttons: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "paragraph",
      "ul",
      "ol",
      "|",
      "link",
      "outdent",
      "indent",
    ],
    buttonsXS: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "paragraph",
      "ul",
      "ol",
      "|",
      "link",
      "outdent",
      "indent",
    ],
  };

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => getValue(newContent)}
    />
  );
};

export default RichTextEditor;
