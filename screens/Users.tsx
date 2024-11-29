import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { NavigationProps } from "../navigation/stackNavigators";
import Input from "../components/Input";
import User from "../services/user.model";
import UserList from "../components/UserList";
import userdbapiService from "../services/user.service";

interface UserScreenState {
  users: Array<User>;
  data: Array<User>;
}

export default class Users extends Component<NavigationProps, UserScreenState> {
  state: UserScreenState = {
    users: [],
    data: [],
  };

  getAll = () => {
    userdbapiService
      .getAll()
      .then((data: Array<User>) => {
        this.setState({ data });
      })
      .then(() => {
        this.setState({ users: this.state.data });
      });
  };

  onInput = (text: string) => {
    if (text !== null && text !== undefined && text !== "") {
      const { data } = this.state;
      var newArray = [];
      newArray = data.filter((item) => {
        let userName = item.firstName + "" + item.lastName;
        return userName.toLowerCase().includes(text.toLowerCase());
      });
      newArray !== null && newArray !== undefined && newArray.length > 0
        ? this.setState({
            users: newArray,
          })
        : this.setState({ users: [] });
    } else {
      this.componentDidMount();
    }
  };

  componentDidMount() {
    this.getAll();
  }

  render() {
    return (
      <View style={styles.container}>
        <Input placeholder="Enter a user name" onChangeText={this.onInput} />
        <UserList
          users={this.state.users}
          navigation={this.props.navigation}
        ></UserList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
