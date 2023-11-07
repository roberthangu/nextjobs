/**
 * What comes from the backend
 */
export interface Job {
    id: string;
    sourceSiteName: string;
    role: string;
    company: string;
    location: string;
    listedIndustry: string;
    postedAt: Date;
    employment: string;
    workType: string;
    jobLevel: string;
    yearsExperience: number;
    benefits: string[];
    jobDescription: string;
    companyDescription: string;
    companySize: string;
    recruiterName?: string;
    recruiterPhone?: string;
    recruiterAddress?: string;
    recruiterUrl?: string;
    recruiterEmail?: string;
    pay?: string;
    closingDate?: Date;
    scrapingUrl: string;
    originalPostingUrl: string;
    logoUrl: string;
    lastmod: Date;
    compIndShort: string;
    compFocusShort: string;
    roleReqsShort: string;
    roleActivitiesShort: string;
    extrRecruiterInd?: string;
    embedding: number[];
    similarity: number;
}

/**
 * The complete job information
 */
export interface PersonalizedJob extends Job {
    commonalities: string;
    positioning: string;
}
