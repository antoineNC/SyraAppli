import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import {
  RootStackParamList,
  UsersStackScreen,
  ResourcesStackScreen,
} from "./stackNavigators";

const Tab = createBottomTabNavigator<RootStackParamList>();
export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "white",
      tabBarActiveBackgroundColor: "#98cfc3",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
        fontSize: 10,
      },
    }}
  >
    <Tab.Screen
      name="Users"
      component={UsersStackScreen}
      options={{
        tabBarLabel: "Users",
        tabBarIcon: (props) => (
          <Icon
            name="users"
            type="font-awesome"
            color={props.color}
            size={props.size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Resources"
      component={ResourcesStackScreen}
      options={{
        tabBarLabel: "Resources",
        tabBarIcon: (props) => (
          <Icon
            name="bookmark-o"
            type="font-awesome"
            color={props.color}
            size={props.size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
