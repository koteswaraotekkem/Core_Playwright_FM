export interface IAPIHeaders {
    companyId?: string;
    requestUser?: string;
    departmentId?: string;
    storeId?: string;
    enterpriseId?: string;
}

export class APIHeaders implements IAPIHeaders {
    companyId?: string;
    requestUser?: string;
    departmentId?: string;
    storeId?: string;
    enterpriseId?: string;

    constructor(headers?: IAPIHeaders) {
        this.companyId = headers?.companyId;
        this.requestUser = headers?.requestUser;
        this.departmentId = headers?.departmentId;
        this.storeId = headers?.storeId;
        this.enterpriseId = headers?.enterpriseId;
    }

    static fromDefaults(config: any): APIHeaders {
        return new APIHeaders({
            companyId: config.headers['x-company-id'],
            requestUser: config.headers['x-request-user'],
            departmentId: config.headers['x-department-id'],
            storeId: config.headers['x-store-id'],
            enterpriseId: config.headers['x-enterprise-id']
        });
    }

    merge(overrides?: IAPIHeaders): APIHeaders {
        return new APIHeaders({
            companyId: overrides?.companyId ?? this.companyId,
            requestUser: overrides?.requestUser ?? this.requestUser,
            departmentId: overrides?.departmentId ?? this.departmentId,
            storeId: overrides?.storeId ?? this.storeId,
            enterpriseId: overrides?.enterpriseId ?? this.enterpriseId
        });
    }

    toHeaders(): Record<string, string> {
        const headers: Record<string, string> = {};
        
        if (this.companyId !== undefined) headers['x-company-id'] = this.companyId;
        if (this.requestUser !== undefined) headers['x-request-user'] = this.requestUser;
        if (this.departmentId !== undefined) headers['x-department-id'] = this.departmentId;
        if (this.storeId !== undefined) headers['x-store-id'] = this.storeId;
        if (this.enterpriseId !== undefined) headers['x-enterprise-id'] = this.enterpriseId;
        
        return headers;
    }
}