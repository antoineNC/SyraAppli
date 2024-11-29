import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import User from "../services/user.model";
import { NavigationProps } from "../navigation/stackNavigators";
import UserItem from "./UserItem";

interface UserListProps extends NavigationProps {
  users: Array<User>;
}

export default class UserList extends Component<UserListProps> {
  render() {
    if (this.props.users?.length > 0)
      return (
        <FlatList<User>
          style={styles.userList}
          data={this.props.users}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => {
            return <UserItem user={item} navigation={this.props.navigation} />;
          }}
        />
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No user yet!</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  userList: {
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
