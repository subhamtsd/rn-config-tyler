import React, { useState } from "react";
import { View, Text, TextInput, Button, TextArea } from "react-native";
import tailwind from "tailwind-rn";

const TailwindForm = () => {
  const [value, onChangeText] = useState("");
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <View style={tailwind("h-full")}>
      <View style={tailwind("pt-12 items-center")}>
        <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
          <Text style={tailwind("text-blue-800 font-bold")}>Tailwind demo</Text>
        </View>
      </View>
      <View style={tailwind("px-4 py-5 bg-white ")}>
        <View style={tailwind(" flex-row mt-1 ")}>
          <View style={tailwind("m-1 w-1/2")}>
            <TextInput
              onFocus={() => {
                setHasFocus(true);
              }}
              style={tailwind(
                "mt-1 text-black-500 text-xl w-3/4 border border-indigo-200 rounded"
              )}
              placeholder="Enter first name"
              clearButtonMode="always"
            />
          </View>

          <View style={tailwind(" m-1 w-1/2")}>
            <TextInput
              onFocus={() => {
                setHasFocus(true);
              }}
              style={tailwind(
                "mt-1 text-black-500 text-xl w-3/4 border border-indigo-200 rounded"
              )}
              placeholder="Enter last name"
            />
          </View>
        </View>
        <TextInput
          onFocus={() => {
            setHasFocus(true);
          }}
          placeholder="Enter email"
          style={tailwind(
            "mt-1 text-indigo-300 text-xl w-full border border-indigo-200 rounded"
          )}
        />
        <TextInput
          onFocus={() => {
            setHasFocus(true);
          }}
          placeholder="Enter your address"
          multiline={true}
          numberOfLines={3}
          maxLength={50}
          style={tailwind(
            "mt-1 text-indigo-300 text-xl w-full border border-indigo-200 rounded "
          )}
        />
      </View>
      <View style={tailwind(" items-center")}>
        <Button title="submit"></Button>
      </View>
    </View>
  );
};

export default TailwindForm;

// View style={tailwind("h-full")}>
//       <View style={tailwind("pt-12 items-center")}>
//         <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
//           <Text style={tailwind("text-blue-800 font-semibold")}>
//             Hello Tailwind
//           </Text>
//         </View>
//       </View>
//       <View style={tailwind("grid grid-cols-6 gap-6")}>
//         <View style={tailwind("px-4 py-5 bg-white sm:p-6")}>
//           <View style={tailwind("col-span-6 sm:col-span-3")}>
//             <Text style={tailwind("block text-sm font-bold text-red-500")}>
//               First name
//             </Text>
//             <TextInput
//               // style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//               style={tailwind(
//                 "block text-sm font-bold text-black-500 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//               )}
//               onChangeText={(text) => onChangeText(text)}
//               value={value}
//             />
//             <Text style={tailwind("block text-sm font-bold text-red-500")}>
//               Last name
//             </Text>
//             <TextInput
//               // style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//               style={tailwind(
//                 "block text-sm font-bold text-black-500 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//               )}
//               onChangeText={(text) => onChangeText(text)}
//               value={value}
//             />
//           </View>
//         </View>
//       </View>
//     </View>

//-----------------------------------------------//

{
  /* <View style={tailwind("h-full")}>
<View style={tailwind("pt-12 items-center")}>
  <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
    <Text style={tailwind("text-blue-800 font-bold")}>Tailwind demo</Text>
  </View>
</View>
<View style={tailwind("shadow overflow-hidden sm:rounded-md")}>
<View style={tailwind("px-4 py-5 bg-white sm:p-6")}>
  <View style={tailwind("grid grid-cols-6 gap-6")}>
  <View style={tailwind("col-span-6 sm:col-span-3")}>
  <Text style={tailwind("block text-grey-800 font-semibold ")}>
    First name
  </Text>
  <TextInput
    onFocus={() => {
      setHasFocus(true);
    }}
    placeholder="Enter first name"
    style={[
      hasFocus
        ? { backgroundColor: "white" }
        : { backgroundColor: "blue" },
      tailwind(
        "p-10 text-indigo-600 text-lg w-full border border-indigo-200"
      ),
    ]}
    clearButtonMode="always"
  />
  </View>

  <View style={tailwind("col-span-6 sm:col-span-3")}>
  <Text style={tailwind("block text-sm font-medium text-gray-700")}>
    Last name
  </Text>
  <TextInput
    onFocus={() => {
      setHasFocus(true);
    }}
    placeholder="Enter last name"
    style={tailwind(
      "mt-1 text-indigo-300 text-xl w-full border border-indigo-200 "
    )}
  />
  </View>

  <View style={tailwind("col-span-6 sm:col-span-4")}>
  <Text style={tailwind("block text-sm font-medium text-gray-700")}>
    Email address
  </Text>
  <TextInput
    onFocus={() => {
      setHasFocus(true);
    }}
    placeholder="Enter email"
    style={tailwind(
      "mt-1 text-indigo-300 text-xl w-full border border-indigo-200 "
    )}
  />
</View>
<View style={tailwind(" items-center")}>
  <Button title="submit"></Button>
</View>


</View>
</View>
</View>
</View>
 */
}
