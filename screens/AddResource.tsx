import React, { Component } from "react";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  NavigationProps,
  RootStackParamList,
} from "../navigation/stackNavigators";
import { RouteProp } from "@react-navigation/core";
import Resource from "../services/resource.model";
import resourceService from "../services/resource.service";

interface AddResourceState {
  name: string;
  description: string;
  links: string;
  departmentId: string;
}

interface AddResourceProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "AddResource">;
}

export default class AddResource extends Component<
  AddResourceProps,
  AddResourceState
> {
  state: AddResourceState = {
    name: "",
    description: "",
    links: "",
    departmentId: "",
  };

  addResource = () => {
    if (this.state.name != "" && this.state.departmentId != null) {
      const newId = this.newId(this.props.route.params.data);
      let params = {
        id: newId.toString(),
        nameResource: this.state.name,
        descriptionResource: this.state.description,
        links: this.state.links,
        departmentId: this.state.departmentId,
        department: null,
        users: null,
      };
      resourceService.addResource(params);
      this.props.navigation.navigate("Resources", { reload: true });
    } else {
      Alert.alert("Champ vide", "Certains champs obligatoires sont vides");
    }
  };

  newId = (data: Array<Resource>) => {
    return data[data.length - 1].id + 1;
  };

  render() {
    const listDpt = [
      { label: "Engineering", value: "1" },
      { label: "Economics", value: "2" },
      { label: "Mathematics", value: "3" },
      { label: "English", value: "4" },
      { label: "Other", value: "5" },
    ];

    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Name"
              style={{ fontSize: 15 }}
              onChangeText={(text) => this.setState({ name: text })}
            />
          </View>

          <View style={[styles.textInput, styles.textInputDescription]}>
            <TextInput
              placeholder="Description"
              multiline={true}
              style={styles.descriptionText}
              onChangeText={(text) => this.setState({ description: text })}
            />
          </View>

          <View style={styles.selectDpt}>
            <RNPickerSelect
              placeholder={{
                label: "Department",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(dpt: string) => {
                this.setState({ departmentId: dpt });
              }}
              items={listDpt}
            />
          </View>

          <View style={styles.textInput}>
            <TextInput
              placeholder="Link"
              style={{ fontSize: 15 }}
              onChangeText={(text) => this.setState({ links: text })}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.addResource}
          >
            <Text style={styles.appButtonText}>Add resource</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
  },
  textInputDescription: {
    height: 300,
  },
  descriptionText: {
    fontSize: 15,
    height: 270,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  selectDpt: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    alignSelf: "center",
    width: 200,
  },
  buttonContainer: {
    margin: 30,
    backgroundColor: "#98cfc3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 30,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    height: 40,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
