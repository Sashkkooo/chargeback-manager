export type CaseStatus = "open" | "pending" | "won" | "lost";

export type CaseStage =
    | "inquiry"
    | "chargeback"
    | "pre-arbitration"
    | "arbitration";

export interface EvidenceItem {
    id: string;
    filename: string;
    url: string;
    type: string;
}

export interface TimelineEvent {
    id: string;
    message: string;
    timestamp: string;
    actor: "system" | "merchant" | "customer";
}

export interface CaseItem {
    id: string;
    customer: string;
    amount: number;
    status: CaseStatus;

    reason: string;
    merchant: string;

    stage: CaseStage;

    createdAt: string;
    updatedAt: string;
    deadline: string;

    evidence: EvidenceItem[];
    timeline: TimelineEvent[];
}

export type TimelineActor = "merchant" | "customer" | "system";

