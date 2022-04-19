import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../config/firebaseConfig";
import { CreateTopicParams, ITopic } from "./topicTypes";

export const createTopicAPI = async (
  data: CreateTopicParams
): Promise<void> => {
  const topicsColl = collection(db, "topics");

  await addDoc(topicsColl, data);
};
