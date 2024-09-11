import React, { type ReactNode } from 'react';
import { type ViewProps } from 'react-native';
import Animated, {
  type AnimatedProps,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

type AnimatedViewBasicProps = {
  children: ReactNode;
  disableExiting?: boolean;
  duration?: number;
} & AnimatedProps<ViewProps>;

export const BASIC_ANIMATION_DURATION_MS = 200;

export const AnimatedViewBasic = ({
  children,
  disableExiting=false,
  duration = BASIC_ANIMATION_DURATION_MS,
  ...rest
}: AnimatedViewBasicProps) => {
  return (
    <Animated.View
      entering={FadeIn.duration(duration)}
      exiting={disableExiting ? undefined : FadeOut.duration(duration)}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};
