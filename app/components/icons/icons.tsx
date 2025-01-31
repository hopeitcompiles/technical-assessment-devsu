import { Path, Svg, SvgProps } from "react-native-svg";

const defaultProps: SvgProps = {
  fill: "black",
  height: 20,
  width: 20,
};

const IconChevronRight = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 384 512" {...defaultProps} {...props}>
      <Path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </Svg>
  );
};

const IconMoneyBills = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 640 512" {...defaultProps} {...props}>
      <Path d="M96 96v224c0 35.3 28.7 64 64 64h416c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zm64 160c35.3 0 64 28.7 64 64h-64v-64zm64-160c0 35.3-28.7 64-64 64V96h64zm352 160v64h-64c0-35.3 28.7-64 64-64zM512 96h64v64c-35.3 0-64-28.7-64-64zm-64 112c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120v240c0 66.3 53.7 120 120 120h400c13.3 0 24-10.7 24-24s-10.7-24-24-24H120c-39.8 0-72-32.2-72-72V120z" />
    </Svg>
  );
};

const IconClose = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" {...defaultProps} {...props}>
      <Path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
    </Svg>
  );
};

export const Icons = {
  ChevronRight: IconChevronRight,
  MoneyBill: IconMoneyBills,
  Close: IconClose,
};
