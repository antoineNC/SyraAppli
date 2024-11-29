import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  NavigationProps,
  RootStackParamList,
} from "../navigation/stackNavigators";
import { RouteProp } from "@react-navigation/core";
import { Icon } from "react-native-elements";
import resourceService from "../services/resource.service";
import ResourceList from "../components/ResourceList";
import Resource from "../services/resource.model";
import Input from "../components/Input";

interface ResourceState {
  resources: Array<Resource>;
  data: Array<Resource>;
}

interface ResourceProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Resources">;
}

export default class Resources extends Component<ResourceProps, ResourceState> {
  state: ResourceState = {
    resources: [], // the displayed list of resources
    data: [], // the complete resource data
  };

  getAll = () => {
    resourceService
      .getAll()
      .then((data: Array<Resource>) => {
        this.setState({ data });
      })
      .then(() => {
        this.setState({ resources: this.state.data });
      });
  };

  onInput = (text: string) => {
    if (text !== null && text !== undefined && text !== "") {
      const { data } = this.state;
      var newArray = [];
      newArray = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      newArray !== null && newArray !== undefined && newArray.length > 0
        ? this.setState({
            resources: newArray,
          })
        : this.setState({ resources: [] });
    } else {
      this.componentDidMount();
    }
  };

  componentDidMount() {
    this.getAll();
  }

  render() {
    if (this.props.route.params.reload == true) {
      this.getAll();
    }
    return (
      <View style={styles.container}>
        <Input
          placeholder="Enter a resource name"
          onChangeText={this.onInput}
        />
        <ResourceList
          resources={this.state.resources}
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("AddResource", {
              data: this.state.data,
            })
          }
          style={styles.addButton}
        >
          <Icon name="plus" type="font-awesome" color={"white"} size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#98cfc3",
    position: "absolute",
    bottom: 20,
    left: 30,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
