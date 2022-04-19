export type TopicState = {
  topics: ITopic[];
  topic: ITopic;
  status: "idle" | "loading" | "failed";
  error: string;
};

export interface ITopic {
  id: string;
  heading: string;
  ownerID: string;
}

export type CreateTopicParams = {
  heading: string;
  ownerID: string;
};

export type GetTopicParams = {
  orderBy: keyof ITopic;
};
