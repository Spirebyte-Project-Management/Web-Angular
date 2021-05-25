export class GrantModel {
    type: GrantTypes;
    value: string;

    setGrant(grant: any) {
        this.type = grant.type;
        this.value = JSON.stringify(grant.value);
    }
}

export enum GrantTypes {
    Anyone,
    ProjectGroup,
    ProjectLead,
    ProjectUser
}