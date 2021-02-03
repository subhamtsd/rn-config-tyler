import React, { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";

export const RandomPic = ({
  label,
  style,
  setAppState,
  appState,
  getEvents,
}) => {
  const [randomCatImg, setRandomCatImg] = useState(null);

  const fetchRandomCat = () => {
    setRandomCatImg("");
    fetch(`https://aws.random.cat/meow`)
      .then((res) => res.json())
      .then((catInfo) => {
        setRandomCatImg(catInfo.file);
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
          onPress={() => {
            fetchRandomCat();
            setAppState({
              home: {
                ui: "About",
                props: { label: "home->1" },
                children: <Text>Hola from RandomPic</Text>,
              },
              actioncomp: {
                ui: "Home",
                props: { label: "actioncomp-2" },
                children: null,
              },
            });
          }}
          title={`Image ${label}`}
        ></Button>
      </View>
      {randomCatImg !== "" ? (
        <View>
          <Image
            source={{
              uri: randomCatImg,
            }}
            style={{ width: 170, height: 180, ...style }}
          />
        </View>
      ) : (
        <Text>Loading Image</Text>
      )}
    </View>
  );
};
