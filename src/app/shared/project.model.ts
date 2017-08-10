export class Project{
    constructor(public title: string,
                public time: number,
                public description: string,
                public pinned?: boolean){
                  if(typeof pinned === 'undefined'){
                    pinned = false;
                  }
                }
}
