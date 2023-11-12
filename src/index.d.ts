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
    postedAt: string;
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
    pay: string;
    closingDate?: string;
    scrapingUrl: string;
    originalPostingUrl: string;
    logoUrl: string;
    lastmod: string;
    compIndShort: string;
    compFocusShort: string;
    roleReqsShort: string;
    roleActivitiesShort: string;
    extrRecruiterInd?: string;
    embedding: number[];
    similarity: number;

    // TODO Move these out in case of performance issues
    commonalities: string;
    positioning: string;
}
