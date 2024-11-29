import { Alert } from "react-native";
import Resource from "./resource.model";

const rootEndpoint = "https://ensc2022syra.azurewebsites.net/api/ResourceApi/";

// Resource data fields, as returned by the API
interface ResourceData {
  id: number;
  nameResource: string;
  descriptionResource: string;
  links: string;
  departmentId: number;
  department: string;
  users: string
}

class ResourceService {
  // Retrieve all resources
  getAll(): Promise<Array<Resource>> {
    // Fetch API for all resources, then transform the returned JSON data
    return this.get("").then((resourcesData) => this.createResources(resourcesData));
  }

  addResource(params: any) {
    this.post("", params)
  }

  deleteResource(id : number) {
    Alert.alert(
      "Attention",
      "Etes-vous sûr(e) de vouloir supprimer ce post ?",
      [
        {
          text: "Oui",
          onPress: () => {
            if (id) {
              const query = id.toString();
              this.delete(query);
            }
          },
        },
        {
          text: "Non",
          onPress: () => {},
        },
      ]
    );
   
  }

  // Convert an array of JSON data to an array  of Resource objects
  private createResources(resourcesData: Array<ResourceData>): Array<Resource> {
    // Apply the same function to each element of the array
    return resourcesData.map((resourceData) => this.createResource(resourceData));
  }

  // Convert JSON data for a resource into a Resource object
  private createResource(resourceData: ResourceData): Resource {
    return new Resource(
      resourceData.id,
      resourceData.nameResource,
      resourceData.descriptionResource,
      resourceData.links,
      resourceData.departmentId,
      resourceData.department,
      resourceData.users
    );
  }

  private get(query:string): Promise<any>{
    let options = {
      method: 'GET'
    }
    return this.fetchFromApi(query, options);
  }

  private post(query: string, params: any) : Promise<any>{
    let options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(params),
    }
    return this.fetchFromApi(query, options);
  }

  private delete(query: string) : Promise<any>{
    let options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    }
    console.log(rootEndpoint+query)
    return this.fetchFromApi(query, options)
  }

  private fetchFromApi(query: string, options: any) : Promise<any>{
    return fetch(rootEndpoint+query, options)
    .then((response)=>response.json())
    .catch((error) => {console.error(error); return null;})
  }
}

export default new ResourceService();