/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { StyleSheet, TextInput } from "react-native";

const AutoExpandingTextInput = (props) => {
  const [height, setHeight] = useState(props.minHeight);
  // const [maxHeight, setmaxHeight] = useState(
  //   props.maxHeight || props.minHeight * 5
  // );
  const inputRef = useRef();

  const _onContentSizeChange = (event) => {
    const curHeight = event.nativeEvent.contentSize.height;
    if (curHeight < props.minHeight) return;
    setHeight(curHeight);
  };

  return (
    <TextInput
      ref={inputRef}
      {...props}
      multiline={true}
      onContentSizeChange={_onContentSizeChange}
      style={[styles.default, props.style, { height: height }]}
    />
  );
};

AutoExpandingTextInput.PropTypes = {
  minHeight: PropTypes.number.isRequired,
  maxHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    textAlign: "left",
  },
});
