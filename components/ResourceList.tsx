import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Resource from "../services/resource.model";
import { NavigationProps } from "../navigation/stackNavigators";
import ResourceItem from "./ResourceItem";

interface ResourceListProps extends NavigationProps {
  resources: Array<Resource>;
}

export default class ResourceList extends Component<ResourceListProps> {
  render() {
    if (this.props.resources?.length > 0)
      return (
        <FlatList<Resource>
          style={styles.resourceList}
          data={this.props.resources}
          keyExtractor={(resource) => resource.id.toString()}
          renderItem={({ item }) => {
            return (
              <ResourceItem
                resource={item}
                navigation={this.props.navigation}
              />
            );
          }}
        />
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Nothing to drink yet!</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  resourceList: {
    flex: 1,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
