import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Resource from "../services/resource.model";
import { NavigationProps } from "../navigation/stackNavigators";
import resourceService from "../services/resource.service";
import { Icon } from "react-native-elements";

interface ResourceItemProps extends NavigationProps {
  resource: Resource;
}

export default class ResourceItem extends Component<ResourceItemProps> {
  department(department: number) {
    if (department == 1) {
      return "Engineering";
    } else if (department == 2) {
      return "Economics";
    } else if (department == 3) {
      return "Mathematics";
    } else if (department == 4) {
      return "English";
    } else {
      return "Other";
    }
  }

  defineBgColor(department: number) {
    switch (department) {
      case 1:
        return "blue";
      case 2:
        return "white";
      case 3:
        return "orange";
      case 4:
        return "green";
      default:
        return "red";
    }
  }

  render() {
    const { resource, navigation } = this.props;

    return (
      <View
        style={{
          flex: 1,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Resource", {
              resourceId: resource.id,
            });
          }}
        >
          <TouchableOpacity
            onPress={() => resourceService.deleteResource(resource.id)}
            style={{ alignSelf: "flex-end" }}
          >
            <Icon
              style={{ margin: 10 }}
              size={20}
              name="trash"
              type="font-awesome"
            />
          </TouchableOpacity>
          <Text style={styles.resourceList}>{resource.name}</Text>
          <View
            style={[
              styles.department,
              { backgroundColor: this.defineBgColor(resource.departmentId) },
            ]}
          >
            <Text>{this.department(resource.departmentId)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resourceList: {
    padding: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  department: {
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    alignSelf: "flex-end",
    borderRadius: 50,
    marginBottom: "5%",
  },
});
