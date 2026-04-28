export interface IAddTechnicianRequest {
    employees?: string[];
    employeeType?: string;
}

export class AddTechnicianRequest implements IAddTechnicianRequest {
    employees?: string[];
    employeeType?: string;

    constructor(request?: IAddTechnicianRequest) {
        this.employees = request?.employees;
        this.employeeType = request?.employeeType;
    }

    static fromDefaults(config: any): AddTechnicianRequest {
        return new AddTechnicianRequest({
            employees: config.api.requestBodies.addTechnicianToTeam.employees,
            employeeType: config.api.requestBodies.addTechnicianToTeam.employeeType
        });
    }

    merge(overrides?: IAddTechnicianRequest): AddTechnicianRequest {
        return new AddTechnicianRequest({
            employees: overrides?.employees ?? this.employees,
            employeeType: overrides?.employeeType ?? this.employeeType
        });
    }

    toRequestBody(): any {
        const body: any = {};
        
        if (this.employees !== undefined) body.employees = this.employees;
        if (this.employeeType !== undefined) body.employeeType = this.employeeType;
        
        return body;
    }
}