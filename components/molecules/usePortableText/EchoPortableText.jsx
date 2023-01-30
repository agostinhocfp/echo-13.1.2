import { PortableText } from "@portabletext/react";
import React from "react";

const EchoPortableText = ({ value }) => {
  return (
    <PortableText
      value={value}
      components={components}
      serializers={serializers}
    />
  );
};

const components = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    lineBreak: (props) => <br />,
  },
};

export default EchoPortableText;
