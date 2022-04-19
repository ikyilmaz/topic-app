import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore/lite";
import { db } from "../../config/firebaseConfig";
import {
  CreateTopicParams,
  GetTopicParams as GetTopicsParams,
  ITopic,
} from "./topicTypes";

export class TopicAPI {
  static async create(data: CreateTopicParams): Promise<void> {
    const topicsColl = collection(db, "topics");

    await addDoc(topicsColl, data);
  }

  static async getAll(data: GetTopicsParams) {
    const first = query(
      collection(db, "topics"),
      orderBy(data.orderBy),
      limit(25)
    );
    const snapshot = await getDocs(first);

    // Get the last visible document
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    console.log("last", lastVisible.id);

    console.log("first", first);

    const docs: ITopic[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ITopic, "id">),
    }));

    const next = query(
      collection(db, "topics"),
      orderBy(data.orderBy),
      startAfter(lastVisible),
      limit(25)
    );
  }
}
