import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import User from "../services/user.model";
import { NavigationProps } from "../navigation/stackNavigators";

interface UserItemProps extends NavigationProps {
  user: User;
}

export default class UserItem extends Component<UserItemProps> {
  department(department: number) {
    if (department == 1) {
      return "Book";
    } else if (department == 2) {
      return "Video";
    } else if (department == 3) {
      return "Website";
    } else if (department == 4) {
      return "Place";
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
    const { user, navigation } = this.props;

    return (
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity>
          <Text style={styles.userList}>
            {user.lastName} {user.firstName}
          </Text>
          <View
            style={[
              styles.department,
              { backgroundColor: this.defineBgColor(user.id) },
            ]}
          >
            <Text>{this.department(user.id)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userList: {
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
