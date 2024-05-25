import { Text, TextProps, TextStyle } from "react-native";

const SIZE_VARIANTS = {
  title: 24,
  subtitle: 18,
  normal: 14,
  small: 10,
};

const WEIGHT_VARIANTS = {
  bolder: 900,
  bold: 700,
  semibold: 600,
  normal: 400,
};

interface ITextProps extends TextProps {
  children: string | string[];
  style?: TextStyle;
  size?: keyof typeof SIZE_VARIANTS;
  weight?: keyof typeof WEIGHT_VARIANTS;
  align?: TextStyle["textAlign"];
  color?: string;
}

export default function text({
  align,
  size,
  weight,
  style,
  color,
  children,
  ...restOfProps
}: ITextProps) {
  const customStyle: TextStyle = { color };
  if (size) {
    customStyle.fontSize = SIZE_VARIANTS[size];
  }
  if (weight) {
    customStyle.fontWeight = WEIGHT_VARIANTS[weight] as TextStyle["fontWeight"];
  }
  customStyle.textAlign = align;

  return (
    <Text style={[customStyle, style]} {...restOfProps}>
      {children}
    </Text>
  );
}
