import ace from "brace";
import "brace/mode/json";
import React, { Component } from "react";
import Ajv from "ajv";
import { Platform } from "react-native";
const ajv = new Ajv({ allErrors: true, verbose: true });
export class JSONEditor extends Component {
  render() {
    if (Platform.OS !== "web") {
      return null;
    } else {
      require("./JSONEditor.css");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Editor = require("jsoneditor-react").JsonEditor;

      const { validate, json, schemaRefs, schema, onError, onChangeJSON } = this.props;
      // TODO: add toggle between JSON tree and code mode
      // TODO: add code mode changes getting reflected to actual config
      return [
        <Editor
          ajv={ajv}
          onValidate={function (json) {
            var errors = [];
            if (validate) {
              if (!ajv?.validate(schema, json)) {
                errors.push({
                  path: ["some error"],
                  message: "Correct schema errors",
                });
              }
              if (errors.length === 0) onChangeJSON(json);
            } else {
              onChangeJSON(json);
            }
          }}
          ace={ace}
          key={1}
          navigationBar={true}
          history={true}
          value={json}
          allowedModes={["text", "code", "tree", "form", "view"]}
          // onChange={(json) => {
          //   if (this.ajv?.validate(this.schema, json)) {
          //     this.onChangeJSON(json);
          //   }
          // }}
          onError={onError}
          schema={schema}
          schemaRefs={schemaRefs}
          // theme={"ace/theme/github"}
        />,
      ];
    }
  }
}
