import React, { useMemo } from "react";
import { Image, ImageProps } from "react-native";

const image = ({ source, ...restOfProps }: ImageProps) => {
  const invalidImageUri = "../../../assets/no-image-available.png";
  const isValidSource: boolean = useMemo(() => {
    const { uri } = source as any;
    const url = uri as string;
    return url?.startsWith("www.") || url.startsWith("https");
  }, [source]);

  return (
    <Image
      source={isValidSource ? source : require(invalidImageUri)}
      {...restOfProps}
    />
  );
};

export default image;
