import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TodoApp2 } from "./TodoApp2";

export const TodoApp1 = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  newAppState:any
  // task:any;
  // handleAddTask:any
}) => {
  const {
    appState,
    label,
    styles,
    children,
    setAppState,
    layoutConfig,
    setLayoutConfig,
    getEvents,
    newAppState
  } = props;

  const [task, setTask] = React.useState();
  const [taskItems, setTaskItems] = React.useState(["add"]);

  const handleAddTask = () => {
    console.log(task);
    if (!task) {
      return alert("Please add your task ...");
    } else {
      setAppState({
        // $global: {
        //   setTaskItems: (appState?.$global?.setTaskItems || []).concat(task),
        // },
        "a": ["d"],  
      },
      // "copy"
      // "isPartial"
      );
    }
  };
  console.log(appState);


//   { "$global" : {

//     "a": "b" }
 
//  }
//  { c: "d"}
//  Saurabh S8:13 PM
//  {
 
//       c: "d",
//       "$global" : {
 
//          "a": "b"
//       }
 
//  }
//  {
 
//       c: "d",
     
//  }


  const deleteTask = (index) => {
    let itemsArray = appState?.$global?.setTaskItems;
    itemsArray.splice(index, 1);
    setTaskItems(itemsArray);
  };

  return (
    <View>
      <Text style={{}}>TodoApp1 *** {label}</Text>
      <View
        style={{
          marginLeft: 100,
          marginRight: 100,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Add a task"
          onChangeText={(text) => setTask(text)}
          value={task}
          // onBlur={() => handleAddTask()}
        />
      </View>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button  title="Add" onPress={() => handleAddTask()}></Button>
      </View>
      <View
        style={{
          marginLeft: 100,
          marginRight: 100,
        }}
      >
        {(appState?.$global?.setTaskItems || []).map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
              {/* <TodoApp2 text={item} id={index} /> */}
              <Text key={index}>{item}</Text>
            </TouchableOpacity>
          );
        })}
        <Button
          testID={`${label}-btn-one`}
          // handleAddTask={handleAddTask}
          title="Add Task"
          {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState,appState)}
        ></Button>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
