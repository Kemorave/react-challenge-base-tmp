 
    export interface Something {
        country: string;
        region: string;
        city: string;
        lat: number;
        lng: number;
        postalCode: string;
        timezone: string;
        geonameId: number;
    }

    

    export interface SomethingResponce {
        name: string;
        somthing: Something;
        domains: string[];
        isp: string;
    }