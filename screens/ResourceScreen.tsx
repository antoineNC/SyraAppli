import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import {
  RootStackParamList,
  NavigationProps,
} from "../navigation/stackNavigators";
import Resource from "../services/resource.model";
import resourcedbapiService from "../services/resource.service";

interface ResourceScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Resource">;
}

interface ResourceScreenState {
  resource: Resource;
  isLoading: boolean;
  allresources: Array<Resource>;
}

export default class ResourceScreen extends Component<
  ResourceScreenProps,
  ResourceScreenState
> {
  state: ResourceScreenState = {
    isLoading: true,
    resource: {
      id: 1,
      name: "null",
      description: "null",
      links: "null",
      departmentId: 1,
      department: "null",
      users: "null",
    },
    allresources: [],
  };

  componentDidMount() {
    // Resource instructions are not returned when searching by ingredient
    // Workaround is to pass only resource id to this screen, and do another API call
    // to get all resource properties, including instructions
    resourcedbapiService.getAll().then((allresources: Array<Resource>) => {
      this.setState({ allresources, isLoading: false }, () => {
        this.getResource();
      });
    });
  }

  getResource = () => {
    const resourceId = this.props.route.params.resourceId;
    const resourceScreen = this.state.allresources.filter(
      (item) => item.id === resourceId
    )[0];

    // Update screen title
    this.props.navigation.setOptions({ title: resourceScreen.name });
    const resource = resourceScreen;
    this.setState({ resource });
  };

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { resource } = this.state;
      return (
        <View style={styles.container}>
          <Text style={styles.instructionsTitle}>Titre</Text>
          <Text style={styles.instructionsText}>{resource.name}</Text>
          <Text style={styles.instructionsTitle}>Description</Text>
          <Text style={styles.instructionsText}>{resource.description}</Text>
          <Text style={styles.instructionsTitle}>Lien</Text>
          <Text
            style={[styles.instructionsText, styles.link]}
            onPress={() => Linking.openURL(resource.links)}
          >
            {resource.links}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 15,
  },
  instructionsTitle: { fontSize: 22, marginBottom: 10 },
  instructionsText: {
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
