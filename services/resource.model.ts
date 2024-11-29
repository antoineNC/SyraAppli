export default class Resource {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public links: string,
      public departmentId: number,
      public department: string,
      public users: string,
    ) {
    }
  } 
