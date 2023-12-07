declare interface ProposalComment {
  created_at: string;
  id: string;
  text: string;
  user_id: string;
  name: string;
  research_paper_id: string;
  modified_at: string;
}

declare interface PostCommentPayload {
  text: string;
  research_id: string;
}
