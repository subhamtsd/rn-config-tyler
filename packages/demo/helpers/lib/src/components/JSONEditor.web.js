import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";
import React, { Component } from "react";
import { Platform } from "react-native";

export class JSONEditor extends Component {
  render() {
    if (Platform.OS !== "web") {
      return null;
    } else {
      require("./JSONEditor.css");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Editor = require("jsoneditor-react").JsonEditor;

      const { json, onError, onChangeJSON } = this.props;
      // TODO: add toggle between JSON tree and code mode
      // TODO: add code mode changes getting reflected to actual config

      return [
        <Editor
          ace={ace}
          key={1}
          value={json}
          mode={"tree"}
          modes={["text", "code", "tree", "form", "view"]}
          onChange={onChangeJSON}
          onError={onError}
          theme={"ace/theme/github"}
        />,
      ];
    }
  }
}
