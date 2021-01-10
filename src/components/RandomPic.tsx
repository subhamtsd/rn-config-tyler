import React, { useState, useEffect } from "react";
import { View, Image, Button, Text } from "react-native";

export const RandomPic = ({ dispatch, action, label }) => {
  const [randomCatImg, setRandomCatImg] = useState(null);

  const fetchRandomCat = () => {
    setRandomCatImg("");
    fetch(`https://aws.random.cat/meow`)
      .then((res) => res.json())
      .then((catInfo) => {
        setRandomCatImg(catInfo.file);
        //
        dispatch(
          action(["111", "19191919"], {
            sample_key: "sample_val",
            ui: ["About", "RandomPic"],
            props: [{ label: "111->1" }, { label: "19191919-2" }],
            children: [<Text>Hello About</Text>, null]
          })
        );
      });
  };

  useEffect(() => {
    if (randomCatImg === null) {
      fetchRandomCat();
    }
  });

  return (
    <View>
      <View>
        <Button
          onPress={() => fetchRandomCat()}
          title={`New Image ${label}`}
        ></Button>
      </View>
      {randomCatImg !== "" ? (
        <View>
          <Image
            source={{
              uri: randomCatImg
            }}
            style={{ width: 170, height: 180 }}
          />
        </View>
      ) : (
        <Text>Loading Image</Text>
      )}
    </View>
  );
};
