import { createStore, Store } from "redux";
import reducer from "../reducers";

export const store: Store = createStore(reducer);
