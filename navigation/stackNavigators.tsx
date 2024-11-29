import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import Users from "../screens/Users";
import Resources from "../screens/Resources";
import AddResource from "../screens/AddResource";
import Resource from "../services/resource.model";
import ResourceScreen from "../screens/ResourceScreen";

export type RootStackParamList = {
  Users: undefined;
  Resources: { reload: boolean };
  AddResource: { data: Array<Resource> };
  Resource: { resourceId: number };

};

export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const UsersStack = createStackNavigator<RootStackParamList>();
const ResourcesStack = createStackNavigator<RootStackParamList>();

const stackScreenOptions: StackNavigationOptions = {
  headerTitleAlign: "center",
};

export const UsersStackScreen = () => {
  return (
    <UsersStack.Navigator screenOptions={stackScreenOptions}>
      <UsersStack.Screen
        name="Users"
        component={Users}
        options={(navigation) => ({
          title: "Users",
        })}
      />
    </UsersStack.Navigator>
  );
};

export const ResourcesStackScreen = () => {
  return (
    <ResourcesStack.Navigator screenOptions={stackScreenOptions}>
      <ResourcesStack.Screen
        name="Resources"
        component={Resources}
        options={(navigation) => ({
          title: "Resources",
        })}
        initialParams={{ reload: false }}
      />
      <ResourcesStack.Screen
        name="AddResource"
        component={AddResource}
        options={(navigation) => ({
          title: "Add a new resource",
        })}
      />
      <ResourcesStack.Screen name="Resource" component={ResourceScreen} />
    </ResourcesStack.Navigator>
  );
};
