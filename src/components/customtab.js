import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFF' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ flex: 1, padding: 10, alignItems: 'center' }}
          >
            <Text style={{ color: isFocused ? '#121212' : '#ccc' }}>
              {options.tabBarIcon}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
