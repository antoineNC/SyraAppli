import User from "./user.model";

const rootEndpoint = "https://ensc2022syra.azurewebsites.net/api";

// User data fields, as returned by the API
interface UserData {
  id: number;
  lastName: string;
  firstName: string;
  resources: string;
}

class UserService {
  // Retrieve all users
  getAll(): Promise<Array<User>> {
    // Fetch API for all users, then transform the returned JSON data
    return fetch(rootEndpoint + "/UserApi").then((response) =>
      response.json().then((usersData) => this.createUsers(usersData))
    );
  }

  // Convert an array of JSON data to an array  of User objects
  private createUsers(usersData: Array<UserData>): Array<User> {
    // Apply the same function to each element of the array
    return usersData.map((userData) => this.createUser(userData));
  }

  // Convert JSON data for a user into a User object
  private createUser(userData: UserData): User {
    return new User(
      userData.id,
      userData.lastName,
      userData.firstName,
      userData.resources
    );
  }
}

export default new UserService();