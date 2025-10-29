export interface CandidateAttribute {
  key: string;
  label: string;
  value: string;
  order?: number;
}

export interface Candidate {
  id: string;
  submitted_at: string;
  attributes: CandidateAttribute[];
}

// export interface CandidateResponse {
//   data: Candidate[];
// }

