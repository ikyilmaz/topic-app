import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TopicAPI } from "./topicAPI";
import { CreateTopicParams, GetTopicParams, TopicState } from "./topicTypes";

const initialState = { topic: null, topics: null } as unknown as TopicState;

export const createTopic = createAsyncThunk(
  "topic/create-topic",
  async (data: CreateTopicParams) => {
    await TopicAPI.create(data);
  }
);

export const getTopics = createAsyncThunk(
  "topic/get-topics",
  async (data: GetTopicParams) => {
    await TopicAPI.getAll(data);
  }
);

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE TOPIC
    builder
      .addCase(createTopic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTopic.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.code as string;
      });
  },
});

export default topicSlice.reducer;
